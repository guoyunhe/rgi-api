import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importRedumpDat from '../helpers/importRedumpDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'dc',
      },
      {
        name: 'Dreamcast',
        alias: '',
        releaseDate: DateTime.fromISO('1998-11-27'),
      }
    );
    await importRedumpDat(platform);
    await importLibretroThumb(platform, 'Sega_-_Dreamcast');
  }
}
