import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'md',
      },
      {
        name: 'Mega Drive',
        alias: 'Sega Genesis',
        releaseDate: DateTime.fromISO('1988-10-29'),
      }
    );
    await importNoIntroDat(platform, 32);
    await importLibretroThumb(platform, 'Sega_-_Mega_Drive_-_Genesis');
  }
}
