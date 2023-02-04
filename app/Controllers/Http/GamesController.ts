import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Image from 'App/Models/Image';

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    const { noBoxartImage, noSnapImage, noTitleImage, page, perPage, platform } =
      await request.validate({
        schema: schema.create({
          noBoxartImage: schema.boolean.optional(),
          noSnapImage: schema.boolean.optional(),
          noTitleImage: schema.boolean.optional(),
          page: schema.number.optional(),
          perPage: schema.number.optional([rules.range(5, 100)]),
          platform: schema.string.optional(),
        }),
      });

    let query = Game.query();
    query = query.whereNull('mainId');
    query = query.preload('images').preload('subs');

    if (platform) {
      query = query.where('platformId', platform);
    }

    if (noBoxartImage) {
      query = query.whereDoesntHave('images', (q) => {
        q.where('type', 'boxart');
      });
    }

    if (noSnapImage) {
      query = query.whereDoesntHave('images', (q) => {
        q.where('type', 'snap');
      });
    }

    if (noTitleImage) {
      query = query.whereDoesntHave('images', (q) => {
        q.where('type', 'title');
      });
    }

    return query.paginate(page || 1, perPage);
  }

  public async show({ request, response }: HttpContextContract) {
    const game = await Game.find(request.param('id'));

    if (game) {
      await game.load('images');
      await game.load('platform');
      return game;
    } else {
      return response.notFound();
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const game = await Game.find(request.param('id'));

    if (!game) return response.notFound();

    const { addImageId, removeImageId } = await request.validate({
      schema: schema.create({
        addImageId: schema.number.optional([rules.exists({ table: 'images', column: 'id' })]),
        removeImageId: schema.number.optional([rules.exists({ table: 'images', column: 'id' })]),
      }),
    });

    if (addImageId) {
      const image = await Image.find(addImageId);
      if (image) {
        await game.related('images').save(image);
        await Activity.create({
          type: 'user',
          userId: auth.user?.id,
          targetType: 'game',
          targetId: game.id,
          action: 'addImage',
          data: { imageId: image.id },
        });
      }
    }

    if (removeImageId) {
      await game.related('images').detach([removeImageId]);
      await Activity.create({
        type: 'user',
        userId: auth.user?.id,
        targetType: 'game',
        targetId: game.id,
        action: 'removeImage',
        data: { imageId: removeImageId },
      });
    }

    await game.load('images');
    await game.load('platform');
    return game;
  }
}
