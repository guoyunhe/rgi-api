import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Platform from 'App/Models/Platform';

export default class PlatformsController {
  public async index({}: HttpContextContract) {
    return Platform.all();
  }
}
