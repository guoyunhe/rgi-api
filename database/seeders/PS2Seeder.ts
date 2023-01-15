import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Game from 'App/Models/Game';
import Title from 'App/Models/Title';
import fetchRedumpDat from '../../utils/fetchRedumpDat';
import parseRedumpName from '../../utils/parseRedumpName';

const platform = 'PS2';

export default class extends BaseSeeder {
  public async run() {
    const data = await fetchRedumpDat('ps2');

    for (let i = 0; i < data.length; i++) {
      const { serial, name, version, rom } = data[i] as any;
      if (!serial) {
        console.log(name);
        return;
      }
      const { regions, languages, title, disc } = parseRedumpName(name);

      const parsedSerial = serial?.trim().substring(0, 10).replaceAll(' ', '-');

      const game = await Game.firstOrNew({ serial: parsedSerial, platform });

      let needSave = !game.id;

      if (!game.name) {
        game.name = name;
        needSave = true;
      }

      if (!game.version) {
        game.version = String(version);
        needSave = true;
      }

      if (!game.disc) {
        game.disc = disc;
        needSave = true;
      }

      if (!game.name) {
        game.name = name;
        needSave = true;
      }

      if (!game.regions) {
        game.regions = regions;
        needSave = true;
      }

      if (!game.languages) {
        game.languages = languages;
        needSave = true;
      }

      if (!game.titleId) {
        const { id } = await Title.firstOrCreate(
          { name: title },
          { name: title }
        );
        game.titleId = id;
        needSave = true;
      }

      if (needSave) {
        await game.save();
      }
    }
  }
}
