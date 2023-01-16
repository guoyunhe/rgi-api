import { column } from '@ioc:Adonis/Lucid/Orm';
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
}
