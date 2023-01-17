import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Series from 'App/Models/Series';

export default class GameSeriesController {
  public async index({ request }: HttpContextContract) {
    return Series.query().paginate(request.input('page', 1), request.input('perPage', 10));
  }
}
