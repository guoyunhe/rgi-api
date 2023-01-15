import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import seedRedumpDat from '../../utils/redump/seedRedump';

export default class extends BaseSeeder {
  protected platform = 'PS2';

  public async run() {
    await seedRedumpDat(this.platform);
  }
}