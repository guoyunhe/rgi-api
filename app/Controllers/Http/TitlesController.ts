import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Title from 'App/Models/Title';

export default class TitlesController {
  public async index({ request }: HttpContextContract) {
    return Title.query().paginate(request.input('page', 1), request.input('perPage', 10));
  }
}
