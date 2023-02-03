import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importRedumpDat from '../helpers/importRedumpDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'gc',
      },
      {
        name: 'GameCube',
        alias: 'Dolphin',
        releaseDate: DateTime.fromISO('2001-09-14'),
      }
    );
    await importRedumpDat(platform);
    await importLibretroThumb(platform, 'Nintendo_-_GameCube');
  }
}
