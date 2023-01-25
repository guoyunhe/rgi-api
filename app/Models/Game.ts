import { BelongsTo, belongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Image from './Image';
import Link from './Link';
import Model from './Model';
import Title from './Title';
import Translation from './Translation';

export default class Game extends Model {
  /** Title ID that the game belongs to */
  @column()
  public titleId: number;

  /** Title that the game belongs to */
  @belongsTo(() => Title)
  public title: BelongsTo<typeof Title>;

  /** ID of main game (Disc 1) that the game (Disc 2,3,..., Rev 2, Rev 3...) belongs to */
  @column()
  public mainId: number | null;

  /** Main game (Disc 1) that the game (Disc 2,3,..., Rev 2, Rev 3...) belongs to */
  @belongsTo(() => Game)
  public main: BelongsTo<typeof Game>;

  /** Name in English */
  @column()
  public name: string;

  /** Like GBA (GameBoy Advanced), PS2 (PlayStation 2), NS (Nintendo Switch) */
  @column()
  public platform: string;

  /** Like Japan, USA, Europe */
  @column()
  public region: string | null;

  /** Like En, Fr, Pt */
  @column()
  public language: string | null;

  /** Disc 1, Disc 2, etc. */
  @column()
  public disc: number;

  /** Serial of game disc or cartridge, not available for old platform and indie games */
  @column()
  public serial: string | null;

  /** Game version */
  @column()
  public version: string | null;

  /** Boxart, snap screen and title screen images */
  @manyToMany(() => Image)
  public images: ManyToMany<typeof Image>;

  /** External links */
  @manyToMany(() => Link)
  public links: ManyToMany<typeof Link>;

  /** Translated attributes */
  @manyToMany(() => Translation)
  public translations: ManyToMany<typeof Translation>;
}
