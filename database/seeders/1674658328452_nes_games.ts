import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import importNoIntroDat from '../helpers/importNoIntroDat';

export default class extends BaseSeeder {
  public async run() {
    await importNoIntroDat('nes', 45);
  }
}