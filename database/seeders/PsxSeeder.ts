import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importRedumpDat from '../helpers/importRedumpDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'psx',
      },
      {
        name: 'PlayStation',
        alias: 'PSOne',
        releaseDate: DateTime.fromISO('1994-12-03'),
      }
    );
    await importRedumpDat(platform);
    await importLibretroThumb(platform, 'Sony_-_PlayStation');
  }
}
