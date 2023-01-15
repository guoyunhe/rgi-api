import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Model from './Model';
import Title from './Title';

export default class Game extends Model {
  @column({ isPrimary: true })
  public id: number;

  /** Title ID that the game belongs to */
  @column()
  public titleId: number;

  /** Title that the game belongs to */
  @belongsTo(() => Title)
  public title: BelongsTo<typeof Title>;

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
  public nameKo: string;
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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
