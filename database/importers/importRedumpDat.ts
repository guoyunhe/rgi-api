import download from 'download';
import glob from 'fast-glob';
import { XMLParser } from 'fast-xml-parser';
import { readFile, rm } from 'fs/promises';

import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Rom from 'App/Models/Rom';
import Title from 'App/Models/Title';
import parseRedumpName from 'util/parseRedumpName';
import parseSerial from 'util/parseSerial';

/**
 * Download Redump data
 * @see http://wiki.redump.org/index.php?title=Redump_Search_Parameters
 * @see https://github.com/RobLoach/libretro-dats/blob/master/download.js
 */
async function downloadRedumpDat(platform: string) {
  const dist = `tmp/redump-${platform}`;
  await rm(dist, { force: true, recursive: true });
  await download(`http://redump.org/datfile/${platform}/serial,version,disc`, dist, {
    extract: true,
  });
  const file = (await glob(dist + '/*.dat'))[0];
  const xml = await readFile(file, 'utf-8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const data = parser.parse(xml);
  const games = data.datafile.game
    .filter((item: any) => item.category === 'Games')
    .sort((a: any, b: any) => a.name.localeCompare(b.name));
  return games;
}

export default async function importRedumpDat(platform: string) {
  const data = await downloadRedumpDat(platform.toLowerCase());

  for (let i = 0; i < data.length; i++) {
    const { serial, name, version, rom } = data[i] as any;
    if (!serial) continue;

    const { region, language, title, mainName, disc } = parseRedumpName(name);
    const parsedSerial = parseSerial(platform, serial);

    const game = await Game.firstOrNew({
      name,
      serial: parsedSerial,
      platform: platform.toUpperCase(),
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
          action: 'title.import',
          data: {
            titleId: titleObj.id,
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
          platform: platform.toUpperCase(),
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
        action: 'game.import',
        data: {
          gameId: game.id,
          source: 'redump',
        },
      });
    }

    if (rom) {
      const roms = Array.isArray(rom) ? rom : [rom];
      for (let j = 0; j < roms.length; j++) {
        const { name, size, md5, sha1 } = roms[j];
        const romObj = await Rom.firstOrNew({ gameId: game.id, md5, sha1 }, { name, size });
        if (!romObj.id) {
          await romObj.save();
          await Activity.create({
            type: 'system',
            action: 'rom.import',
            data: {
              romId: rom.id,
              source: 'redump',
            },
          });
        }
      }
    }
  }
}
