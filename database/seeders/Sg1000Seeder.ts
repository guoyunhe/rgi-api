import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'sg1000',
      },
      {
        name: 'SG-1000',
        alias: 'SC-3000',
        releaseDate: DateTime.fromISO('1983-07-15'),
      }
    );
    await importNoIntroDat(platform, 19);
    await importLibretroThumb(platform, 'Sega_-_SG-1000');
  }
}
