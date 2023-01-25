import { BelongsTo, belongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Link from './Link';
import Model from './Model';
import Series from './Series';
import Translation from './Translation';

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

  /** External links */
  @manyToMany(() => Link)
  public links: ManyToMany<typeof Link>;

  /** Translated attributes */
  @manyToMany(() => Translation)
  public translations: ManyToMany<typeof Translation>;
}
