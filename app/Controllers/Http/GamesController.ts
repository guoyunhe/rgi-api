import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Game from 'App/Models/Game';
import Image from 'App/Models/Image';

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    let query = Game.query();
    query = query.whereNull('mainId');
    query = query.preload('images');

    if (request.input('noBoxartImage')) {
      query = query.whereHas(
        'images',
        (q) => {
          q.where('type', 'boxart');
        },
        '=',
        0
      );
    }

    if (request.input('noSnapImage')) {
      query = query.whereDoesntHave('images', (q) => {
        q.where('type', 'snap');
      });
    }

    if (request.input('noTitleImage')) {
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

  public async update({ request, response }: HttpContextContract) {
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
      }
    }

    await game.load('images');
    return game;
  }
}
