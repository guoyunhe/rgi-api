import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import GamePort from './GamePort';

export default class GameRom extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  /** Game port ID that the rom belongs to */
  @column()
  public gamePortId: number;

  /** Game port that the rom belongs to */
  @belongsTo(() => GamePort)
  public gamePort: BelongsTo<typeof GamePort>;

  /** Disc 1, Disc 2, etc. */
  @column()
  public discNumber: number;

  /** Serial of game disc or cartridge, not available for old platform and indie games */
  @column()
  public serial: number | null;

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
