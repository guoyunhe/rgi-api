import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Rom from 'App/Models/Rom';
import Title from 'App/Models/Title';
import parseName from './parseName';
import { RawGame } from './types';

/**
 * Save games and roms in database.
 */
export default async function createGames(platform: string, rawGames: RawGame[], source: string) {
  for (let i = 0; i < rawGames.length; i++) {
    const { serial, name, version, rom: rawRom } = rawGames[i] as any;

    const { region, language, title, mainName, displayName } = parseName(name);

    const game = await Game.firstOrNew(
      {
        name,
        platform,
      },
      {
        displayName,
        region,
        language,
        version,
        serial,
      }
    );

    let needSave = !game.id;

    if (game.version !== version) {
      game.version = version;
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
      const titleObj = await Title.firstOrNew({ name: title });
      if (!titleObj.id) {
        await titleObj.save();
        await Activity.create({
          type: 'system',
          targetType: 'title',
          targetId: titleObj.id,
          action: 'import',
          data: {
            source,
          },
        });
      }
      game.titleId = titleObj.id;
      needSave = true;
    }

    if (!game.mainId && name !== mainName) {
      const mainGame = await Game.query()
        .where({
          name: mainName,
          platform,
        })
        .first();
      if (mainGame) {
        game.mainId = mainGame.id;
        needSave = true;
      }
    }

    if (needSave) {
      await game.save();
      await Activity.create({
        type: 'system',
        targetType: 'game',
        targetId: game.id,
        action: 'import',
        data: {
          source,
        },
      });
    }

    if (rawRom) {
      const rawRoms = Array.isArray(rawRom) ? rawRom : [rawRom];
      for (let j = 0; j < rawRoms.length; j++) {
        const { name, size, md5, sha1 } = rawRoms[j];
        const rom = await Rom.firstOrNew({ gameId: game.id, md5, sha1 }, { name, size });
        if (!rom.id) {
          await rom.save();
          await Activity.create({
            type: 'system',
            targetType: 'rom',
            targetId: rom.id,
            action: 'import',
            data: {
              source,
            },
          });
        }
      }
    }
  }
}
