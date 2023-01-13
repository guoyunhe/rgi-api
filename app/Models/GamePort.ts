import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import GameTitle from './GameTitle';

export default class GamePort extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  /** Game title ID that the port belongs to */
  @column()
  public gameTitleId: number;

  /** Game title that the port belongs to */
  @belongsTo(() => GameTitle)
  public gameTitle: BelongsTo<typeof GameTitle>;

  /** Like GBA (GameBoy Advanced), PS2 (PlayStation 2), NS (Nintendo Switch) */
  @column()
  public platform: string;

  /** Like JPN, USA, EUR */
  @column()
  public region: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
