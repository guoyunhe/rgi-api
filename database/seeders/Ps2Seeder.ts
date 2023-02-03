import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importRedumpDat from '../helpers/importRedumpDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'ps2',
      },
      {
        name: 'PlayStation 2',
        alias: '',
        releaseDate: DateTime.fromISO('2000-03-04'),
      }
    );
    await importRedumpDat(platform);
    await importLibretroThumb(platform, 'Sony_-_PlayStation_2');
  }
}
