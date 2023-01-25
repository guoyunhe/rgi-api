import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import importRedumpDat from '../../helpers/importRedumpDat';

export default class extends BaseSeeder {
  public async run() {
    await importRedumpDat('ps3');
  }
}
