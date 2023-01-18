import Drive from '@ioc:Adonis/Core/Drive';
import Env from '@ioc:Adonis/Core/Env';
import { column, computed } from '@ioc:Adonis/Lucid/Orm';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import sizeOf from 'image-size';
import sharp from 'sharp';
import Model from './Model';

/**
 * Boxarts, screenshots, etc.
 *
 * All images are converted to PNG format, which is required by RetroArch.
 */
export default class Image extends Model {
  /** User id of who uploaded the image */
  @column()
  public userId: number | null;

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
    // return Drive.getUrl(this.path);
    return `//${Env.get('HOST')}:${Env.get('PORT')}/storage/${this.path}`;
  }

  public static async createFromLocalFile(filePath: string, userId?: number) {
    let buffer = await readFile(filePath);
    const { width, height, type } = sizeOf(buffer);

    // Convert to PNG
    if (type !== 'png') {
      buffer = await sharp(buffer).png().toBuffer();
    }

    const hash = createHash('md5').update(buffer).digest('hex');
    const path = 'images/' + hash;
    if (!(await Drive.exists(path))) {
      await Drive.put(path, buffer);
    }
    const size = buffer.byteLength;
    let image = await Image.findBy('path', path);
    if (!image) {
      image = await Image.create({
        path,
        userId,
        width,
        height,
        size,
      });
    }
    return image;
  }
}
