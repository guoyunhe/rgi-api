import download from 'download';
import glob from 'fast-glob';
import { XMLParser } from 'fast-xml-parser';
import { readFile, rm } from 'fs/promises';

export default async function fetchRedumpDat(platform: string) {
  const dist = `tmp/redump-${platform}`;
  await rm(dist, { force: true, recursive: true });
  await download(
    `http://redump.org/datfile/${platform}/serial,version,disc`,
    dist,
    {
      extract: true,
    }
  );
  const file = (await glob(dist + '/*.dat'))[0];
  const xml = await readFile(file, 'utf-8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const data = parser.parse(xml);
  const games = data.datafile.game.filter(
    (item: any) => item.category === 'Games'
  );
  return games;
}
