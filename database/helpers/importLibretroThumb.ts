import { download } from '@guoyunhe/downloader';
import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Image from 'App/Models/Image';
import Platform from 'App/Models/Platform';
import { mkdtemp, readdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import parseName from './parseName';

const thumbnailTypes = ['Boxart', 'Snap', 'Title'];

function filterThumbnail(fileName: string) {
  return fileName.endsWith('.png') && !fileName.includes('(Demo)') && !fileName.includes('(Beta)');
}

export default async function importLibretroThumb(platform: Platform, repo: string) {
  const tmpPrefix = join(tmpdir(), `libretro-thumbnail-${platform.code}-`);
  const dist = await mkdtemp(tmpPrefix);
  await download(
    `https://github.com//libretro-thumbnails/${repo}/archive/refs/heads/master.tar.gz`,
    dist,
    { strip: 1, extract: true }
  );

  for (let i = 0; i < thumbnailTypes.length; i++) {
    const thumbType = thumbnailTypes[i];
    const thumbTypeRoot = `${dist}/Named_${thumbType}s`;
    let thumbs = (await readdir(thumbTypeRoot, { withFileTypes: true }))
      .filter((thumb) => thumb.isFile() && filterThumbnail(thumb.name))
      .map((thumb) => thumb.name)
      .sort((a, b) => a.replace('.png', '').localeCompare(b.replace('.png', '')));

    let notMatched = 0;
    let total = 0;

    for (let j = 0; j < thumbs.length; j++) {
      const thumb = thumbs[j];
      total++;
      const name = thumb
        .substring(0, thumb.length - 4)
        .replaceAll(/\s+/g, ' ')
        .replaceAll('_', '&');
      const { mainName } = parseName(name);
      let game = await Game.query()
        .preload('images')
        .where({ name: mainName, platformId: platform.id })
        .orWhere({ name, platformId: platform.id })
        .first();
      if (!game) {
        game = await Game.query()
          .where({ name: mainName + ' (Disc 1)', platformId: platform.id })
          .first();
      }
      if (game?.mainId) {
        game = await Game.find(game.mainId);
      }
      if (game) {
        // Save the original PNG image
        let image = await Image.createFromLocalFile(thumbTypeRoot + '/' + thumb, {});
        if (image.fullId) {
          image = (await Image.find(image.fullId)) || image;
        } else {
          // Save the converted WebP image, if PNG is not thumbnailed from other image
          await Image.createFromLocalFile(thumbTypeRoot + '/' + thumb, {
            type: 'webp',
            fullId: image.id,
          });
        }

        await game.related('images').attach({
          [image.id]: {
            category: thumbType.toLowerCase() as any,
          },
        });

        await Activity.create({
          type: 'system',
          targetType: 'image',
          targetId: image.id,
          action: 'import',
          data: {
            source: 'libretro-thumbnails',
          },
        });
        await Activity.create({
          type: 'system',
          targetType: 'game',
          targetId: game.id,
          action: 'addImage',
          data: {
            source: 'libretro-thumbnails',
          },
        });
      } else {
        notMatched++;
        console.log(platform.code, thumbType, '\x1b[31m', 'NotMatched', '\x1b[0m', thumb);
      }
    }
    console.log(
      platform.code,
      thumbType,
      '\x1b[31m',
      'NotMatched',
      '\x1b[0m',
      notMatched,
      ((notMatched / total) * 100).toFixed(2) + '%'
    );
  }
  await rm(dist, { recursive: true, force: true });
}
