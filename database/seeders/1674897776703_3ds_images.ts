import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import importLibretroThumb from '../helpers/importLibretroThumb';

export default class extends BaseSeeder {
  public async run() {
    await importLibretroThumb('3ds', 'Nintendo_-_Nintendo_3DS');
  }
}
