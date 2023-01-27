import Drive from '@ioc:Adonis/Core/Drive';
import Env from '@ioc:Adonis/Core/Env';
import { BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import sizeOf from 'image-size';
import sharp from 'sharp';
import Model from './Model';
import User from './User';

/**
 * Boxart, title and snap images.
 *
 * All images are converted to PNG format, which is required by RetroArch.
 *
 * Sizes:
 * - Boxart: max width 512px
 * - Title and snap:
 *   - PSX, PS2: max 640x480px
 *   - PS3, PS4, NS: max 1280x720px
 */
export default class Image extends Model {
  /** ID of user who uploaded the image */
  @column()
  public userId: number | null;

  /** User who uploaded the image */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  /** Usage type, like avatar, boxart, title, snap */
  @column()
  public type: 'avatar' | 'boxart' | 'snap' | 'title';

  /** File storage path, images/<md5> */
  @column()
  public path: string;

  /** File size in bytes */
  @column()
  public size: number;

  /** Image width in pixels */
  @column()
  public width: number;

  /** Image height in pixels */
  @column()
  public height: number;

  /** Image public url */
  @computed()
  public get url() {
    return `${Env.get('APP_URL')}/storage/${this.path}`;
  }

  public static async createFromLocalFile(
    filePath: string,
    options: {
      type: Image['type'];
      maxWidth?: number;
      maxHeight?: number;
      userId?: number;
    }
  ) {
    let buffer = await readFile(filePath);
    let { width, height, type: fileType } = sizeOf(buffer);

    if (!width || !height || !fileType) throw 'Invalid image file: ' + filePath;

    // Resize and convert to PNG
    const maxWidth = options?.maxWidth || 1280;
    const maxHeight = options?.maxHeight || 960;
    if (fileType !== 'png' || width > maxWidth || height > maxHeight) {
      let pipe = sharp(buffer);
      if (fileType !== 'png') {
        pipe = pipe.png();
        console.log('convert to png:', filePath);
      }
      if (width > maxWidth || height > maxHeight) {
        pipe = pipe.resize({ width: maxWidth, height: maxHeight, fit: sharp.fit.inside });
        const newImageSize = sizeOf(buffer);
        width = newImageSize.width;
        height = newImageSize.height;
        console.log('resize:', filePath);
      }
      buffer = await pipe.toBuffer();
    }

    const hash = createHash('md5').update(buffer).digest('hex');
    const path = 'images/' + hash + '.png';
    if (!(await Drive.exists(path))) {
      await Drive.put(path, buffer);
    }
    const size = buffer.byteLength;
    let image = await Image.findBy('path', path);
    if (!image) {
      const type = options.type;
      image = await Image.create({
        type,
        path,
        userId: options?.userId,
        width,
        height,
        size,
      });
    }
    return image;
  }
}
