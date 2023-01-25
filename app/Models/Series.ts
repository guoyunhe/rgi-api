import { column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Link from './Link';
import Model from './Model';
import Translation from './Translation';

export default class Series extends Model {
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
