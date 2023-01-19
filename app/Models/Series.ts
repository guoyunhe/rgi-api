import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';

export default class Series extends Model {
  /** Name in English */
  @column()
  public name: string;
}
