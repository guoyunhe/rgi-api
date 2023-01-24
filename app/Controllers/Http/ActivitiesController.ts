import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Activity from 'App/Models/Activity';

export default class ActivitiesController {
  public async index({ request }: HttpContextContract) {
    let query = Activity.query().orderBy('createdAt', 'desc');
    if (request.input('type')) {
      query = query.where('type', request.input('type'));
    }
    if (request.input('userId')) {
      query = query.where('userId', request.input('userId'));
    } else {
      query.preload('user');
    }
    if (request.input('targetType')) {
      query = query.where('targetType', request.input('targetType'));
      if (request.input('targetId')) {
        query = query.where('targetId', request.input('targetId'));
      }
    }
    return query.paginate(request.input('page', 1), request.input('perPage', 20));
  }
}
