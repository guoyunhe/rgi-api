import Game from 'App/Models/Game';
import Rom from 'App/Models/Rom';
import Title from 'App/Models/Title';
import parseSerial from '../parseSerial';
import fetchRedumpDat from './fetchRedumpDat';
import parseRedumpName from './parseRedumpName';

export default async function seedRedumpDat(platform: string) {
  const data = await fetchRedumpDat(platform.toLowerCase());

  for (let i = 0; i < data.length; i++) {
    const { serial, name, version, rom } = data[i] as any;
    if (!serial) continue;

    const { region, language, title, mainName, disc } = parseRedumpName(name);
    const parsedSerial = parseSerial(platform, serial);

    const game = await Game.firstOrNew({
      name,
      serial: parsedSerial,
      platform: platform.toUpperCase(),
    });

    let needSave = !game.id;

    if (game.version !== version) {
      game.version = version;
      needSave = true;
    }

    if (game.disc !== disc) {
      game.disc = disc;
      needSave = true;
    }

    if (region && game.region !== region) {
      game.region = region;
      needSave = true;
    }

    if (language && game.language !== language) {
      game.language = language;
      needSave = true;
    }

    if (!game.titleId) {
      const { id } = await Title.firstOrCreate({ name: title });
      game.titleId = id;
      needSave = true;
    }

    if (!game.mainId && name !== mainName) {
      const mainGame = await Game.query()
        .where({
          name: mainName,
          platform: platform.toUpperCase(),
        })
        .first();
      if (mainGame) {
        game.mainId = mainGame.id;
        needSave = true;
      }
    }

    if (needSave) {
      await game.save();
    }

    if (rom) {
      const roms = Array.isArray(rom) ? rom : [rom];
      for (let j = 0; j < roms.length; j++) {
        const { name, size, md5, sha1 } = roms[j];
        await Rom.firstOrCreate({ gameId: game.id, md5, sha1 }, { name, size });
      }
    }
  }
}
