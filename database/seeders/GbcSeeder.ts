import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Platform from 'App/Models/Platform';
import { DateTime } from 'luxon';
import importLibretroThumb from '../helpers/importLibretroThumb';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    const platform = await Platform.firstOrCreate(
      {
        code: 'gbc',
      },
      {
        name: 'Game Boy Color',
        alias: '',
        releaseDate: DateTime.fromISO('1998-10-21'),
      }
    );
    await importNoIntroDat(platform, 47);
    await importLibretroThumb(platform, 'Nintendo_-_Game_Boy_Color');
  }
}
