import Game from 'App/Models/Game';
import Image from 'App/Models/Image';
import download from 'download';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import parseRedumpName from '../redump/parseRedumpName';

const thumbnailTypes = ['Boxart', 'Snap', 'Title'];

function filterThumbnail(fileName: string) {
  return !fileName.includes('(Demo)') && !fileName.includes('(Beta)');
}

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

  for (let i = 0; i < thumbnailTypes.length; i++) {
    const thumbType = thumbnailTypes[i];
    const thumbTypeRoot = `${root}/Named_${thumbType}s`;
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
        const { nameNoRev } = parseRedumpName(name);
        let game = await Game.query()
          .where({ name: nameNoRev, platform })
          .first();
        if (!game) {
          game = await Game.query()
            .where({ name: nameNoRev + ' (Disc 1)', platform })
            .first();
        }
        if (game?.mainId) {
          game = await Game.find(game.mainId);
        }
        if (game) {
          const image = await Image.createFromLocalFile(
            thumbTypeRoot + '/' + thumb.name
          );
          switch (thumbType) {
            case 'Boxart':
              game.boxartImageId = image.id;
              break;
            case 'Snap':
              game.snapImageId = image.id;
              break;
            case 'Title':
              game.titleImageId = image.id;
              break;
          }
          await game.save();
        } else {
          notMatched++;
          console.log(
            platform,
            thumbType,
            '\x1b[31m',
            'NotMatched',
            '\x1b[0m',
            thumb.name
          );
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
