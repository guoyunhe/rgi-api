import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    let query = User.query();
    return query.paginate(request.input('page', 1), request.input('perPage', 12));
  }
}
