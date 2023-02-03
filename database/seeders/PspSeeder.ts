import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importRedumpDat from '../helpers/importRedumpDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'psp',
      },
      {
        name: 'PlayStation Portable',
        alias: '',
        releaseDate: DateTime.fromISO('2004-12-12'),
      }
    );
    await importRedumpDat(platform);
    await importLibretroThumb(platform, 'Sony_-_PlayStation_Portable');
  }
}
