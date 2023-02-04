import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: '3ds',
      },
      {
        name: 'Nintendo 3DS',
        alias: 'Nintendo 2DS',
        releaseDate: DateTime.fromISO('2011-02-26'),
      }
    );
    await importNoIntroDat(platform, 64);
    await importLibretroThumb(platform, 'Nintendo_-_Nintendo_3DS');
  }
}
