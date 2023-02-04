import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'gg',
      },
      {
        name: 'Game Gear',
        alias: '',
        releaseDate: DateTime.fromISO('1990-10-06'),
      }
    );
    await importNoIntroDat(platform, 25);
    await importLibretroThumb(platform, 'Sega_-_Game_Gear');
  }
}
