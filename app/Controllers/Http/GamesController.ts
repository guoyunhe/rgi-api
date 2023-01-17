import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Game from 'App/Models/Game';

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    let query = Game.query();
    query = query.whereNull('mainId');
    query = query.preload('boxartImage');

    if (request.input('noBoxartImage')) {
      query = query.whereNull('boxartImageId');
    }

    if (request.input('hasBoxartImage')) {
      query = query.whereNotNull('boxartImageId');
    }

    if (request.input('noTitleImage')) {
      query = query.whereNull('titleImageId');
    }

    if (request.input('hasTitleImage')) {
      query = query.whereNotNull('titleImageId');
    }

    if (request.input('noSnapImage')) {
      query = query.whereNull('snapImageId');
    }

    if (request.input('hasSnapImage')) {
      query = query.whereNotNull('snapImageId');
    }

    return query.paginate(
      request.input('page', 1),
      request.input('perPage', 10)
    );
  }
}
