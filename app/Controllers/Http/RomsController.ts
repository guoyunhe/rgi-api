import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Rom from 'App/Models/Rom';

export default class GameRomsController {
  public async index({ request }: HttpContextContract) {
    return Rom.query().paginate(
      request.input('page', 1),
      request.input('perPage', 10)
    );
  }
}
