import Game from 'App/Models/Game';
import Rom from 'App/Models/Rom';
import Title from 'App/Models/Title';
import fetchRedumpDat from './fetchRedumpDat';
import parseRedumpName from './parseRedumpName';

export default async function seedRedumpDat(platform: string) {
  const data = await fetchRedumpDat(platform.toLowerCase());

  for (let i = 0; i < data.length; i++) {
    const { serial, name, version, rom } = data[i] as any;
    if (!serial) continue;

    const { regions, languages, title, disc } = parseRedumpName(name);
    const parsedSerial = serial.trim().substring(0, 10).replaceAll(' ', '-');

    const game = await Game.firstOrNew({
      serial: parsedSerial,
      platform: platform.toUpperCase(),
    });

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
      const { id } = await Title.firstOrCreate({ name: title });
      game.titleId = id;
      needSave = true;
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
