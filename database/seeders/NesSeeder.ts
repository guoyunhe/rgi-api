import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'nes',
      },
      {
        name: 'Nintendo Entertainment System',
        alias: 'Family Computer, Famicom',
        releaseDate: DateTime.fromISO('1983-07-15'),
      }
    );
    await importNoIntroDat(platform, 45);
    await importLibretroThumb(platform, 'Nintendo_-_Nintendo_Entertainment_System');
  }
}
