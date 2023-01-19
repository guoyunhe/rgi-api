import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Image from 'App/Models/Image';

export default class ImagesController {
  public async index({ request }: HttpContextContract) {
    return Image.query().paginate(request.input('page', 1), request.input('perPage', 12));
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { imageFile, maxWidth, maxHeight } = await request.validate({
      schema: schema.create({
        maxWidth: schema.number([rules.unsigned(), rules.range(50, 1280)]),
        maxHeight: schema.number([rules.unsigned(), rules.range(50, 1280)]),
        imageFile: schema.file({
          size: '2mb',
          extnames: ['jpg', 'gif', 'png'],
        }),
      }),
    });

    if (imageFile.tmpPath) {
      const image = Image.createFromLocalFile(imageFile.tmpPath, {
        userId: auth.user?.id,
        maxWidth,
        maxHeight,
      });
      return response.created(image);
    } else {
      return response.abort('Fail to upload image', 422);
    }
  }

  public async show({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
