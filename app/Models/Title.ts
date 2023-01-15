import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from './Model';
import Series from './Series';

export default class Title extends Model {
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
  /** Name in German */
  @column()
  public nameDe: string;
  /** Name in Spanish */
  @column()
  public nameEs: string;
  /** Name in Persian */
  @column()
  public nameFa: string;
  /** Name in Finnish */
  @column()
  public nameFi: string;
  /** Name in French */
  @column()
  public nameFr: string;
  /** Name in Hindi */
  @column()
  public nameHi: string;
  /** Name in Italian */
  @column()
  public nameIt: string;
  /** Name in Japanese */
  @column()
  public nameJa: string;
  /** Name in Korean */
  @column()
  public nameKo: string;
  /** Name in Dutch */
  @column()
  public nameNl: string;
  /** Name in Polish */
  @column()
  public namePo: string;
  /** Name in Portuguese */
  @column()
  public namePt: string;
  /** Name in Russion */
  @column()
  public nameRu: string;
  /** Name in Swedish */
  @column()
  public nameSv: string;
  /** Name in Ukrainian */
  @column()
  public nameUk: string;
  /** Name in Vietnamese */
  @column()
  public nameVi: string;
  /** Name in Chinese */
  @column()
  public nameZh: string;

  /** Wikipedia in English */
  @column()
  public wikipedia: string;
  /** Wikipedia in Arabic */
  @column()
  public wikipediaAr: string;
  /** Wikipedia in German */
  @column()
  public wikipediaDe: string;
  /** Wikipedia in Spanish */
  @column()
  public wikipediaEs: string;
  /** Wikipedia in Persian */
  @column()
  public wikipediaFa: string;
  /** Wikipedia in Finnish */
  @column()
  public wikipediaFi: string;
  /** Wikipedia in French */
  @column()
  public wikipediaFr: string;
  /** Wikipedia in Hindi */
  @column()
  public wikipediaHi: string;
  /** Wikipedia in Italian */
  @column()
  public wikipediaIt: string;
  /** Wikipedia in Japanese */
  @column()
  public wikipediaJa: string;
  /** Wikipedia in Korean */
  @column()
  public wikipediaKo: string;
  /** Wikipedia in Dutch */
  @column()
  public wikipediaNl: string;
  /** Wikipedia in Polish */
  @column()
  public wikipediaPo: string;
  /** Wikipedia in Portuguese */
  @column()
  public wikipediaPt: string;
  /** Wikipedia in Russion */
  @column()
  public wikipediaRu: string;
  /** Wikipedia in Swedish */
  @column()
  public wikipediaSv: string;
  /** Wikipedia in Ukrainian */
  @column()
  public wikipediaUk: string;
  /** Wikipedia in Vietwikipediase */
  @column()
  public wikipediaVi: string;
  /** Wikipedia in Chinese */
  @column()
  public wikipediaZh: string;
}
