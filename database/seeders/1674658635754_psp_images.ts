import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import importLibretroThumb from '../helpers/importLibretroThumb';

export default class extends BaseSeeder {
  public async run() {
    await importLibretroThumb('psp', 'Sony_-_PlayStation_Portable');
  }
}
