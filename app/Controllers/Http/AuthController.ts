import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Activity from 'App/Models/Activity';
import Image from 'App/Models/Image';
import User from 'App/Models/User';
import { rm } from 'fs/promises';

export default class AuthController {
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
      username: schema.string({ trim: true }, [
        rules.alphaNum({ allow: ['underscore'] }),
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
        rules.maxLength(255),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
        rules.maxLength(255),
      ]),
      password: schema.string({ trim: true }, [
        rules.minLength(8),
        rules.maxLength(32),
        rules.confirmed('passwordConfirm'),
      ]),
    });
    const data = await request.validate({ schema: validations });
    const user = await User.create(data);
    await Activity.create({ type: 'user', userId: user.id, action: 'register' });
    const token = await auth.use('api').attempt(data.email, data.password);
    return { user, token };
  }

  public async user({ auth }: HttpContextContract) {
    await auth.user?.load('avatar');
    return auth.user;
  }

  public async storeAvatar({ request, response, auth }: HttpContextContract) {
    const { imageFile, left, top, width, height } = await request.validate({
      schema: schema.create({
        imageFile: schema.file({
          size: '20mb',
          extnames: ['jpeg', 'jpg', 'gif', 'png'],
        }),
        left: schema.number(),
        top: schema.number(),
        width: schema.number(),
        height: schema.number(),
      }),
    });

    if (!imageFile.tmpPath) {
      return response.abort('Fail to upload image', 422);
    }

    const avatar = await Image.createFromLocalFile(imageFile.tmpPath, {
      userId: auth.user?.id,
      type: 'webp',
      maxWidth: 512,
      maxHeight: 512,
      crop: {
        left,
        top,
        width,
        height,
      },
    });

    await Activity.create({
      type: 'user',
      userId: auth.user!.id,
      targetType: 'image',
      targetId: avatar.id,
      action: 'upload',
    });

    await auth.user?.related('avatar').associate(avatar);

    await Activity.create({
      type: 'user',
      userId: auth.user!.id,
      targetType: 'user',
      targetId: auth.user!.id,
      action: 'addAvatar',
    });

    // Remove tmp file to save disk space
    await rm(imageFile.tmpPath);

    return avatar;
  }

  public async destroyAvatar({ response, auth }: HttpContextContract) {
    await auth.user?.related('avatar').dissociate();
    return response.ok({});
  }
}
