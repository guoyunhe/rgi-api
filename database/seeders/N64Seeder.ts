import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'n64',
      },
      {
        name: 'Nintendo 64',
        alias: '',
        releaseDate: DateTime.fromISO('1996-06-23'),
      }
    );
    await importNoIntroDat(platform, 24);
    await importLibretroThumb(platform, 'Nintendo_-_Nintendo_64');
  }
}
