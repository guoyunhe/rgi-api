import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class GameSeries extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  /** Name in English */
  public name: string;
  /** Name in Arabic */
  public nameAr: string;
  /** Name in Hindi */
  public nameHi: string;
  /** Name in Japanese */
  public nameJa: string;
  /** Name in Korean */
  public nameKr: string;
  /** Name in Chinese */
  public nameZh: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
