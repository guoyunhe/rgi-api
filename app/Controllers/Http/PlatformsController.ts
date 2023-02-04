import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Platform from 'App/Models/Platform';

export default class PlatformsController {
  public async index({}: HttpContextContract) {
    return (await Platform.all()).sort((a, b) => a.name.localeCompare(b.name));
  }
}
