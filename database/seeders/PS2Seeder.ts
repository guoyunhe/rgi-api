import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import importRedumpDat from '../importers/importRedumpDat';

export default class extends BaseSeeder {
  protected platform = 'PS2';

  public async run() {
    if (false) {
      await importRedumpDat(this.platform);
    }
  }
}
