import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import fetchLibretroThumbnails from '../../utils/libretro/fetchLibretroThumbnails';
import seedRedumpDat from '../../utils/redump/seedRedump';

export default class extends BaseSeeder {
  protected platform = 'PSX';

  public async run() {
    if (true) {
      await seedRedumpDat(this.platform);
    }
    await fetchLibretroThumbnails(this.platform, 'Sony_-_PlayStation');
  }
}
