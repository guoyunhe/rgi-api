import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Model from './Model';
import Series from './Series';

export default class Title extends Model {
  @column({ isPrimary: true })
  public id: number;

  /** Series ID that the game belongs to */
  @column()
  public seriesId: number;

  /** Series that the game belongs to */
  @belongsTo(() => Series)
  public series: BelongsTo<typeof Series>;

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

  /** Wikipedia in English */
  @column()
  public wikipedia: string;
  /** Wikipedia in Arabic */
  @column()
  public wikipediaAr: string;
  /** Wikipedia in Hindi */
  @column()
  public wikipediaHi: string;
  /** Wikipedia in Japanese */
  @column()
  public wikipediaJa: string;
  /** Wikipedia in Korean */
  @column()
  public wikipediaKr: string;
  /** Wikipedia in Chinese */
  @column()
  public wikipediaZh: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
