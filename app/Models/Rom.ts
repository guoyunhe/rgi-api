import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Game from './Game';
import Model from './Model';

export default class Rom extends Model {
  /** Game ID that the rom belongs to */
  @column()
  public gameId: number;

  /** Game that the rom belongs to */
  @belongsTo(() => Game)
  public game: BelongsTo<typeof Game>;

  /** File name */
  @column()
  public name: number | null;

  /** Size in byte */
  @column()
  public size: number | null;

  /** CRC checksum */
  @column()
  public crc: string | null;

  /** MD5 checksum */
  @column()
  public md5: string | null;

  /** SHA-1 checksum */
  @column()
  public sha1: string | null;

  /** Additional description for non-standard or modified ROM */
  @column()
  public description: string | null;
}
