import Application from '@ioc:Adonis/Core/Application';
import { XMLParser } from 'fast-xml-parser';
import { readdir, readFile, rm } from 'fs/promises';
import StreamZip from 'node-stream-zip';
import { join } from 'path';
import puppeteer from 'puppeteer';
import createGames from './createGames';
import { RawGame } from './types';

/**
 * Download No-Intro data
 *
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
  const games = (data.datafile.game as RawGame[])
    .filter(
      (g) =>
        !g.name.includes('(Demo)') &&
        !g.name.includes('(Demo ') &&
        !g.name.includes('(UNROM)') &&
        !g.name.includes('(Program)') &&
        !g.name.includes('(Beta)') &&
        !g.name.includes('[BIOS]')
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  return games;
}

export default async function importNoIntroDat(platform: string, systemId: number) {
  const datFilePath = await downloadDat(platform, systemId);
  const rawGames = await parseDat(datFilePath);
  await createGames(platform, rawGames, 'nointro');
}
