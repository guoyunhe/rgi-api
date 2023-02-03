import { column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Model from './Model';

export default class Platform extends Model {
  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public alias: string | null;

  @column.date()
  public releaseDate: DateTime;
}
