import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';
import User from './User';

export default class Link extends Model {
  /** ID of user who created the link */
  @column()
  public userId: number | null;

  /** User who uploaded the image */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  /** Page URL */
  @column()
  public url: string;

  /** Page title */
  @column()
  public title: string | null;

  /** Page excerpt */
  @column()
  public excerpt: string | null;

  /** Media/user review score, 99/100 will be normalized to 9.9/10 */
  @column()
  public score: number | null;
}
