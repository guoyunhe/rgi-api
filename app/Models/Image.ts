import Drive from '@ioc:Adonis/Core/Drive';
import { column, computed } from '@ioc:Adonis/Lucid/Orm';
import { createHash } from 'crypto';
import { readFile, stat } from 'fs/promises';
import sizeOf from 'image-size';
import Model from './Model';

export default class Image extends Model {
  @column()
  public userId: number | null;

  @column()
  public path: string;

  @column()
  public mime: string;

  @column()
  public size: number;

  @column()
  public width: number;

  @column()
  public height: number;

  @computed()
  public get url() {
    return '/storage/' + this.path;
  }

  public static async createFromLocalFile(filePath: string, userId?: number) {
    const buffer = await readFile(filePath);
    const hash = createHash('md5').update(buffer).digest('hex');
    const path = 'images/' + hash;
    const fullPath = process.cwd() + '/storage/' + path;
    if (!(await Drive.exists(path))) {
      await Drive.put(path, buffer);
    }
    let image = await Image.findBy('path', path);
    if (!image) {
      const { size } = await stat(fullPath);
      const { width, height, type } = sizeOf(fullPath);
      image = await Image.create({
        path,
        userId,
        mime: type,
        width,
        height,
        size,
      });
    }
    return image;
  }
}
