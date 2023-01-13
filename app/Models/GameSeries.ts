import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class GameSeries extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

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
