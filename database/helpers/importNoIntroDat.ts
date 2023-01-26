import Application from '@ioc:Adonis/Core/Application';
import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Rom from 'App/Models/Rom';
import Title from 'App/Models/Title';
import { XMLParser } from 'fast-xml-parser';
import { readdir, readFile, rm } from 'fs/promises';
import StreamZip from 'node-stream-zip';
import { join } from 'path';
import puppeteer from 'puppeteer';
import parseName from './parseName';

/**
 * To get systemId:
 * 1. Go to https://datomatic.no-intro.org/index.php?page=download&op=xml
 * 2. Choose system you want to download
 * 3. Check `s=xx` parameter in browser's address bar
 */
function downloadDat(platform: string, systemId: number) {
  return new Promise<string>(async (resolve, reject) => {
    const downloadPath = Application.tmpPath('nointro-' + platform);
    await rm(downloadPath, { force: true, recursive: true });
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath,
    });
    await page.goto(`https://datomatic.no-intro.org/index.php?page=download&op=xml&s=${systemId}`);
    await page.waitForSelector('input[value="Prepare"]');
    await page.click('input[value="Prepare"]');
    await page.waitForSelector('input[value="Download"]');
    await page.click('input[value="Download"]');
    const timer = setInterval(async () => {
      const zipFileName = (await readdir(downloadPath)).find((f) => f.endsWith('.zip'));
      if (zipFileName) {
        clearInterval(timer);
        const zipFullPath = join(downloadPath, zipFileName);
        const zip = new StreamZip.async({ file: zipFullPath });
        await zip.extract(null, downloadPath);
        const datFileName = (await readdir(downloadPath)).find((f) => f.endsWith('.dat'));
        if (datFileName) {
          await rm(zipFullPath);
          resolve(join(downloadPath, datFileName));
        } else {
          reject(new Error('Fail to extract ' + zipFullPath));
        }
      }
    }, 1000);
  });
}

async function parseDat(filePath: string) {
  const xml = await readFile(filePath, 'utf-8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const data = parser.parse(xml);
  const games = data.datafile.game
    .filter(
      (g: RawGame) =>
        !g.name.includes('(Demo)') &&
        !g.name.includes('(Demo ') &&
        !g.name.includes('(UNROM)') &&
        !g.name.includes('(Program)') &&
        !g.name.includes('(Beta)') &&
        !g.name.includes('[BIOS]')
    )
    .sort((a: RawGame, b: RawGame) => a.name.localeCompare(b.name));
  return games;
}

interface RawRom {
  name: string;
  size: string;
  crc: string;
  md5: string;
  sha1: string;
}

interface RawGame {
  name: string;
  description: string;
  rom: RawRom | RawRom[];
}

async function createGames(platform: string, rawGames: RawGame[]) {
  for (let i = 0; i < rawGames.length; i++) {
    const rawGame = rawGames[i] as any;
    const { name, rom: rawRom } = rawGame;
    const { region, language, title, mainName, disc } = parseName(name);

    const game = await Game.firstOrNew({
      name,
      platform,
    });

    let needSave = !game.id;

    if (region && game.region !== region) {
      game.region = region;
      needSave = true;
    }

    if (language && game.language !== language) {
      game.language = language;
      needSave = true;
    }

    if (game.disc !== disc) {
      game.disc = disc;
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
            source: 'nointro',
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
          source: 'nointro',
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
              source: 'nointro',
            },
          });
        }
      }
    }
  }
}

export default async function importNoIntroDat(platform: string, systemId: number) {
  const datFilePath = await downloadDat(platform, systemId);
  const rawGames = await parseDat(datFilePath);
  await createGames(platform, rawGames);
}
