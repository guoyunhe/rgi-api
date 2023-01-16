import Game from 'App/Models/Game';
import download from 'download';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';

export default async function fetchLibretroThumbnails(
  platform: string,
  repo: string
) {
  const dist = `tmp/libretro-thumbnail-${platform.toLowerCase()}`;
  if (!existsSync(dist)) {
    await download(
      `https://github.com/libretro-thumbnails/${repo}/archive/refs/heads/master.zip`,
      dist,
      {
        extract: true,
      }
    );
  }
  const root = `${dist}/${repo}-master`;
  const boxartRoot = `${root}/Named_Boxarts`;
  const boxarts = await readdir(boxartRoot, { withFileTypes: true });

  let notMatched = 0;
  let total = 0;
  for (let i = 0; i < boxarts.length; i++) {
    const boxart = boxarts[i];
    if (boxart.isFile()) {
      total++;
      const name = boxart.name
        .substring(0, boxart.name.length - 4)
        .replaceAll(/\s+/g, ' ')
        .replaceAll('_', '&');
      const game = await Game.query().where({ name, platform }).first();
      if (game) {
      } else {
        notMatched++;
        console.log('\x1b[31m', 'Boxart not matched', '\x1b[0m', boxart.name);
      }
    }
  }
  console.log(
    notMatched,
    'not matched boxart.',
    ((notMatched / total) * 100).toFixed(2) + '%'
  );
}
