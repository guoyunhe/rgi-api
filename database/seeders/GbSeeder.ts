import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'gb',
      },
      {
        name: 'Game Boy',
        alias: 'Game Boy Pocket, Game Boy Light',
        releaseDate: DateTime.fromISO('1989-04-21'),
      }
    );
    await importNoIntroDat(platform, 46);
    await importLibretroThumb(platform, 'Nintendo_-_Game_Boy');
  }
}
