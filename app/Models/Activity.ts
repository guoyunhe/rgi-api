import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';
import User from './User';

export default class Activity extends Model {
  /** Categorize system activities, admin activities and user activities */
  @column()
  public type: 'system' | 'admin' | 'user';

  /** User id of who uploaded the image */
  @column()
  public userId: number | null;

  /** Title that the game belongs to */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  /** Action code, like 'user.register', 'game.favorite', 'game.image.upload' */
  @column()
  public action: string;

  /** Action data, like { gameId: 24, imageId: 2354 } */
  @column()
  public data: any;
}
