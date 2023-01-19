import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';
import Series from './Series';

export default class Title extends Model {
  /** Series ID that the game belongs to */
  @column()
  public seriesId: number;

  /** Series that the game belongs to */
  @belongsTo(() => Series)
  public series: BelongsTo<typeof Series>;

  /** Name in English */
  @column()
  public name: string;

  /** Wikipedia in English */
  @column()
  public wikipedia: string;
}
