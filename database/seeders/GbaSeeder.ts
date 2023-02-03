import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'gba',
      },
      {
        name: 'Game Boy Advanced',
        alias: 'Game Boy Advance SP, Game Boy Micro',
        releaseDate: DateTime.fromISO('2001-03-21'),
      }
    );
    await importNoIntroDat(platform, 23);
    await importLibretroThumb(platform, 'Nintendo_-_Game_Boy_Advanced');
  }
}
