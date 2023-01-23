import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Image from 'App/Models/Image';
import { existsSync } from 'fs';
import { readdir, rm } from 'fs/promises';
import gitly from 'gitly';
import parseRedumpName from './parseRedumpName';

const thumbnailTypes = ['Boxart', 'Snap', 'Title'];

function filterThumbnail(fileName: string) {
  return !fileName.includes('(Demo)') && !fileName.includes('(Beta)');
}

export default async function importLibretroThumb(platform: string, repo: string) {
  const dist = `tmp/libretro-thumbnail-${platform}`;
  if (!existsSync(dist)) {
    const [tarPath] = await gitly(`libretro-thumbnails/${repo}`, dist, {});
    await rm(tarPath);
  }

  for (let i = 0; i < thumbnailTypes.length; i++) {
    const thumbType = thumbnailTypes[i];
    const thumbTypeRoot = `${dist}/Named_${thumbType}s`;
    const thumbs = await readdir(thumbTypeRoot, { withFileTypes: true });

    let notMatched = 0;
    let total = 0;

    for (let j = 0; j < thumbs.length; j++) {
      const thumb = thumbs[j];
      if (thumb.isFile() && filterThumbnail(thumb.name)) {
        total++;
        const name = thumb.name
          .substring(0, thumb.name.length - 4)
          .replaceAll(/\s+/g, ' ')
          .replaceAll('_', '&');
        const { mainName } = parseRedumpName(name);
        let game = await Game.query().where({ name: mainName, platform }).first();
        if (!game) {
          game = await Game.query()
            .where({ name: mainName + ' (Disc 1)', platform })
            .first();
        }
        if (game?.mainId) {
          game = await Game.find(game.mainId);
        }
        if (game) {
          const image = await Image.createFromLocalFile(thumbTypeRoot + '/' + thumb.name, {
            type: thumbType.toLowerCase() as any,
          });
          await game.related('images').save(image);
          await Activity.create({
            type: 'system',
            action: 'title.import',
            data: {
              gameId: game.id,
              imageId: image.id,
              source: 'libretro-thumbnails',
            },
          });
        } else {
          notMatched++;
          console.log(platform, thumbType, '\x1b[31m', 'NotMatched', '\x1b[0m', thumb.name);
        }
      }
    }
    console.log(
      platform,
      thumbType,
      '\x1b[31m',
      'NotMatched',
      '\x1b[0m',
      notMatched,
      ((notMatched / total) * 100).toFixed(2) + '%'
    );
  }
}
