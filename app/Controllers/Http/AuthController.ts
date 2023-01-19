import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class GamesController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      const token = await auth.use('api').attempt(email, password);
      const user = await User.findBy('email', email);
      return { token, user };
    } catch {
      return response.unauthorized('Invalid credentials');
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke();
    return {
      revoked: true,
    };
  }

  public async register({ auth, request }: HttpContextContract) {
    const validations = await schema.create({
      username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.minLength(8), rules.confirmed('passwordConfirm')]),
    });
    const data = await request.validate({ schema: validations });
    const user = await User.create(data);
    const token = await auth.use('api').attempt(data.email, data.password);
    return { user, token };
  }

  public async user({ auth }: HttpContextContract) {
    return auth.user;
  }
}
