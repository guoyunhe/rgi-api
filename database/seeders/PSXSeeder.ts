import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import importLibretroThumb from '../importers/importLibretroThumb';
import importRedumpDat from '../importers/importRedumpDat';

export default class extends BaseSeeder {
  protected platform = 'PSX';

  public async run() {
    await importRedumpDat(this.platform);
    await importLibretroThumb(this.platform, 'Sony_-_PlayStation');
  }
}
