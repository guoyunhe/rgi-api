import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importRedumpDat from '../helpers/importRedumpDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'ss',
      },
      {
        name: 'Sega Saturn',
        alias: '',
        releaseDate: DateTime.fromISO('1994-11-22'),
      }
    );
    await importRedumpDat(platform);
    await importLibretroThumb(platform, 'Sega_-_Saturn');
  }
}
