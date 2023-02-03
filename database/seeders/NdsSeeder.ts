import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'nds',
      },
      {
        name: 'Nintendo DS',
        alias: ' Nintendo DS lite, Nintendo DSi, Nintendo DSi LL',
        releaseDate: DateTime.fromISO('2001-03-21'),
      }
    );
    await importNoIntroDat(platform, 23);
    await importLibretroThumb(platform, 'Nintendo_-_Nintendo_DS');
  }
}
