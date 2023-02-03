import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'snes',
      },
      {
        name: 'Super Nintendo Entertainment System',
        alias: 'Super Famicom',
        releaseDate: DateTime.fromISO('1990-11-21'),
      }
    );
    await importNoIntroDat(platform, 49);
    await importLibretroThumb(platform, 'Nintendo_-_Super_Nintendo_Entertainment_System');
  }
}
