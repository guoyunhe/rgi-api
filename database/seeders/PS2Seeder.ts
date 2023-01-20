import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import seedRedumpDat from '../../util/redump/seedRedump';

export default class extends BaseSeeder {
  protected platform = 'PS2';

  public async run() {
    if (false) {
      await seedRedumpDat(this.platform);
    }
  }
}
