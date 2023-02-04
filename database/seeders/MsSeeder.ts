import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'ms',
      },
      {
        name: 'Master System',
        alias: 'Mark III',
        releaseDate: DateTime.fromISO('1985-10-20'),
      }
    );
    await importNoIntroDat(platform, 26);
    await importLibretroThumb(platform, 'Sega_-_Master_System_-_Mark_III');
  }
}
