import Drive from '@ioc:Adonis/Core/Drive';
import Env from '@ioc:Adonis/Core/Env';
import Logger from '@ioc:Adonis/Core/Logger';
import { BelongsTo, belongsTo, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import sizeOf from 'image-size';
import sharp from 'sharp';
import Model from './Model';
import User from './User';

/**
 * Various images for game box arts, screenshots, user avatars, etc.
 */
export default class Image extends Model {
  /** The ID of full size image, if this is a thumbnail. */
  @column()
  public fullId: number | null;

  /** The full size image, if this is a thumbnail. */
  @belongsTo(() => Image)
  public full: BelongsTo<typeof Image>;

  /**
   * Thumbnails
   */
  @hasMany(() => Image, { foreignKey: 'fullId' })
  public thumbs: HasMany<typeof Image>;

  /** ID of user who uploaded the image */
  @column()
  public userId: number | null;

  /** User who uploaded the image */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  /** File type */
  @column()
  public type: 'png' | 'jpg' | 'gif' | 'webp';

  /** File storage path, images/<md5>.<type> */
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

  /** Image category, from pivot table */
  @computed()
  public get category() {
    return this.$extras.pivot_category;
  }

  public static async createFromLocalFile(
    filePath: string,
    options: {
      fullId?: number;
      type?: Image['type'];
      maxWidth?: number;
      maxHeight?: number;
      userId?: number;
    }
  ) {
    let buffer = await readFile(filePath);
    let { width, height, type: originalType } = sizeOf(buffer);

    if (!width || !height || !originalType) throw 'Invalid image file: ' + filePath;

    const { maxWidth = 1280, maxHeight = 1280, type = originalType, fullId, userId } = options;

    // Convert and resize if needed
    if ((type && originalType !== type) || width > maxWidth || height > maxHeight) {
      let pipe = sharp(buffer);
      if (type && originalType !== type) {
        switch (type) {
          case 'gif':
            pipe = pipe.gif();
            break;
          case 'jpg':
            pipe = pipe.jpeg();
            break;
          case 'png':
            pipe = pipe.png();
            break;
          case 'webp':
            pipe = pipe.webp();
            break;
        }
        Logger.info(`convert ${originalType} to ${type}: ${filePath}`);
      }
      if (width > maxWidth || height > maxHeight) {
        pipe = pipe.resize({ width: maxWidth, height: maxHeight, fit: sharp.fit.inside });
        const newImageSize = sizeOf(buffer);
        width = newImageSize.width;
        height = newImageSize.height;
        Logger.info('resize %s', filePath);
      }
      buffer = await pipe.toBuffer();
    }

    const hash = createHash('md5').update(buffer).digest('hex');
    const path = `images/${hash}.${type}`;
    if (!(await Drive.exists(path))) {
      await Drive.put(path, buffer);
    }
    const size = buffer.byteLength;

    const image = await Image.firstOrCreate(
      { path },
      {
        path,
        type: type as Image['type'],
        userId,
        width,
        height,
        size,
      }
    );

    // Avoid circling references
    if (fullId && image.id !== fullId) {
      image.fullId = fullId;
    }

    await image.save();
    return image;
  }
}
