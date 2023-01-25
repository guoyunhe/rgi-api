import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import importLibretroThumb from '../helpers/importLibretroThumb';

export default class extends BaseSeeder {
  public async run() {
    await importLibretroThumb('nes', 'Nintendo_-_Nintendo_Entertainment_System');
  }
}
