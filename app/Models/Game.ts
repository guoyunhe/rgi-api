import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Image from './Image';
import Model from './Model';
import Title from './Title';

export default class Game extends Model {
  /** Title ID that the game belongs to */
  @column()
  public titleId: number;

  /** Title that the game belongs to */
  @belongsTo(() => Title)
  public title: BelongsTo<typeof Title>;

  /** Main game ID (Disc 1) that the game (Disc 2,3,...) belongs to */
  @column()
  public mainId: number | null;

  /** Main game (Disc 1) that the game (Disc 2,3,...) belongs to */
  @belongsTo(() => Game)
  public main: BelongsTo<typeof Game>;

  /** Boxart image ID */
  @column()
  public boxartImageId: number | null;

  /** Boxart image */
  @belongsTo(() => Image, { foreignKey: 'boxartImageId' })
  public boxartImage: BelongsTo<typeof Image>;

  /** Title image ID */
  @column()
  public titleImageId: number | null;

  /** Title image */
  @belongsTo(() => Image, { foreignKey: 'titleImageId' })
  public titleImage: BelongsTo<typeof Image>;

  /** Snap image ID */
  @column()
  public snapImageId: number | null;

  /** Snap image */
  @belongsTo(() => Image, { foreignKey: 'snapImageId' })
  public snapImage: BelongsTo<typeof Image>;

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

  /** Like GBA (GameBoy Advanced), PS2 (PlayStation 2), NS (Nintendo Switch) */
  @column()
  public platform: string;

  /** Like Japan, USA, Europe */
  @column()
  public regions: string[] | null;

  /** Like En, Fr, Pt */
  @column()
  public languages: string[] | null;

  /** Disc 1, Disc 2, etc. */
  @column()
  public disc: number;

  /** Serial of game disc or cartridge, not available for old platform and indie games */
  @column()
  public serial: string | null;

  /** Game version */
  @column()
  public version: string | null;
}
