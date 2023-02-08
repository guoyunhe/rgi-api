import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Game from 'App/Models/Game';

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
    query = query
      .preload('images', (builder) => {
        builder.pivotColumns(['category']);
        builder.preload('thumbs');
      })
      .preload('subs');

    if (platform) {
      query = query.where('platformId', platform);
    }

    if (noBoxartImage) {
      query = query.whereDoesntHave('images', (q) => {
        q.where('category', 'boxart');
      });
    }

    if (noSnapImage) {
      query = query.whereDoesntHave('images', (q) => {
        q.where('category', 'snap');
      });
    }

    if (noTitleImage) {
      query = query.whereDoesntHave('images', (q) => {
        q.where('category', 'title');
      });
    }

    return query.paginate(page || 1, perPage);
  }

  public async show({ request, response }: HttpContextContract) {
    const game = await Game.query()
      .preload('images', (builder) => {
        builder.preload('thumbs');
      })
      .preload('platform')
      .where('id', request.param('id'))
      .first();

    if (game) {
      return game;
    } else {
      return response.notFound();
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const game = await Game.find(request.param('id'));

    if (!game) return response.notFound();

    await game.load('images', (builder) => {
      builder.preload('thumbs');
    });
    await game.load('platform');
    return game;
  }
}
