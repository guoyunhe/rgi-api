import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Activity from 'App/Models/Activity';
import Game from 'App/Models/Game';
import Image from 'App/Models/Image';

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    let query = Game.query();
    query = query.whereNull('mainId');
    query = query.preload('images');

    if (request.input('noBoxartImage') === '1') {
      query = query.whereDoesntHave('images', (q) => {
        q.where('type', 'boxart');
      });
    }

    if (request.input('noSnapImage') === '1') {
      query = query.whereDoesntHave('images', (q) => {
        q.where('type', 'snap');
      });
    }

    if (request.input('noTitleImage') === '1') {
      query = query.whereDoesntHave('images', (q) => {
        q.where('type', 'title');
      });
    }

    return query.paginate(request.input('page', 1), request.input('perPage', 12));
  }

  public async show({ request, response }: HttpContextContract) {
    const game = await Game.find(request.param('id'));

    if (game) {
      await game.load('images');
      return game;
    } else {
      return response.notFound();
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const game = await Game.find(request.param('id'));

    if (!game) return response.notFound();

    const { addImageId } = await request.validate({
      schema: schema.create({
        addImageId: schema.number([rules.exists({ table: 'images', column: 'id' })]),
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

    await game.load('images');
    return game;
  }
}
