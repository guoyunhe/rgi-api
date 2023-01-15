import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Game from 'App/Models/Game';

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    return Game.query().paginate(
      request.input('page', 1),
      request.input('perPage', 10)
    );
  }
}
