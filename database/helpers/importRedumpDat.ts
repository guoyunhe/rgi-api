import download from 'download';
import glob from 'fast-glob';
import { XMLParser } from 'fast-xml-parser';
import { readFile, rm } from 'fs/promises';

import createGames from './createGames';
import { RawGame } from './types';

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
  const games = (data.datafile.game as RawGame[])
    .filter((item) => item.category === 'Games' || item.category === 'Add-Ons')
    .sort((a, b) => a.name.localeCompare(b.name));
  return games;
}

export default async function importRedumpDat(platform: string) {
  const filePath = await downloadDat(platform);
  const data = await parseDat(filePath);
  await createGames(platform, data, 'redump');
}
