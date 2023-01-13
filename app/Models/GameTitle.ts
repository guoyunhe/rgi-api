import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import GameSeries from './GameSeries';

export default class GameTitle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  /** Game series ID that the title belongs to */
  @column()
  public gameSeriesId: number;

  /** Game series that the title belongs to */
  @belongsTo(() => GameSeries)
  public gameSeries: BelongsTo<typeof GameSeries>;

  /** Name in English */
  @column()
  public name: string;
  /** Name in Arabic */
  @column()
  public nameAr: string;
  /** Name in Hindi */
  @column()
  public nameHi: string;
  /** Name in Japanese */
  @column()
  public nameJa: string;
  /** Name in Korean */
  @column()
  public nameKr: string;
  /** Name in Chinese */
  @column()
  public nameZh: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
