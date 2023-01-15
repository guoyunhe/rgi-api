import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Game from './Game';
import Model from './Model';

export default class Rom extends Model {
  @column({ isPrimary: true })
  public id: number;

  /** Game ID that the rom belongs to */
  @column()
  public gameId: number;

  /** Game that the rom belongs to */
  @belongsTo(() => Game)
  public game: BelongsTo<typeof Game>;

  /** Size in byte */
  @column()
  public size: number | null;

  /** MD5 checksum */
  @column()
  public md5: string | null;

  /** SHA-1 checksum */
  @column()
  public sha1: string | null;

  /** Additional description for non-standard or modified ROM */
  @column()
  public description: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
