import download from 'download';
import glob from 'fast-glob';
import { XMLParser } from 'fast-xml-parser';
import { readFile, rm } from 'fs/promises';

import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Rom from 'App/Models/Rom';
import Title from 'App/Models/Title';
import parseName from './parseName';
import parseSerial from './parseSerial';

interface RawRom {
  name: string;
  size: string;
  crc: string;
  md5: string;
  sha1: string;
}

interface RawGame {
  name: string;
  category: string;
  description: string;
  rom: RawRom | RawRom[];
}

/**
 * Download Redump data
 * @see http://wiki.redump.org/index.php?title=Redump_Search_Parameters
 * @see https://github.com/RobLoach/libretro-dats/blob/master/download.js
 */
async function downloadDat(platform: string) {
  const dist = `tmp/redump-${platform}`;
  await rm(dist, { force: true, recursive: true });
  await download(`http://redump.org/datfile/${platform}/serial,version`, dist, {
    extract: true,
  });
  return (await glob(dist + '/*.dat'))[0];
}

/**
 * Read and parse XML. Filter and sort games.
 */
async function parseDat(filePath: string) {
  const xml = await readFile(filePath, 'utf-8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const data = parser.parse(xml);
  const games = data.datafile.game
    .filter((item: RawGame) => item.category === 'Games')
    .sort((a: any, b: any) => a.name.localeCompare(b.name));
  return games;
}

/**
 * Save games and roms in database.
 */
async function createGames(platform: string, rawGames: RawGame[]) {
  for (let i = 0; i < rawGames.length; i++) {
    const { serial, name, version, rom: rawRom } = rawGames[i] as any;
    if (!serial) continue;
    const parsedSerial = parseSerial(platform, serial);
    if (!parsedSerial) continue;

    const { region, language, title, mainName, disc } = parseName(name);

    const game = await Game.firstOrNew({
      name,
      serial: parsedSerial,
      platform,
    });

    let needSave = !game.id;

    if (game.version !== version) {
      game.version = version;
      needSave = true;
    }

    if (game.disc !== disc) {
      game.disc = disc;
      needSave = true;
    }

    if (region && game.region !== region) {
      game.region = region;
      needSave = true;
    }

    if (language && game.language !== language) {
      game.language = language;
      needSave = true;
    }

    if (!game.titleId) {
      const titleObj = await Title.firstOrNew({ name: title });
      if (!titleObj.id) {
        await titleObj.save();
        await Activity.create({
          type: 'system',
          targetType: 'title',
          targetId: titleObj.id,
          action: 'import',
          data: {
            source: 'redump',
          },
        });
      }
      game.titleId = titleObj.id;
      needSave = true;
    }

    if (!game.mainId && name !== mainName) {
      const mainGame = await Game.query()
        .where({
          name: mainName,
          platform,
        })
        .first();
      if (mainGame) {
        game.mainId = mainGame.id;
        needSave = true;
      }
    }

    if (needSave) {
      await game.save();
      await Activity.create({
        type: 'system',
        targetType: 'game',
        targetId: game.id,
        action: 'import',
        data: {
          source: 'redump',
        },
      });
    }

    if (rawRom) {
      const rawRoms = Array.isArray(rawRom) ? rawRom : [rawRom];
      for (let j = 0; j < rawRoms.length; j++) {
        const { name, size, md5, sha1 } = rawRoms[j];
        const rom = await Rom.firstOrNew({ gameId: game.id, md5, sha1 }, { name, size });
        if (!rom.id) {
          await rom.save();
          await Activity.create({
            type: 'system',
            targetType: 'rom',
            targetId: rom.id,
            action: 'import',
            data: {
              source: 'redump',
            },
          });
        }
      }
    }
  }
}

export default async function importRedumpDat(platform: string) {
  const filePath = await downloadDat(platform);
  const data = await parseDat(filePath);
  await createGames(platform, data);
}
