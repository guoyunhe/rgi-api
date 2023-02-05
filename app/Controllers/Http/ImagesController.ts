import Drive from '@ioc:Adonis/Core/Drive';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Activity from 'App/Models/Activity';
import Image from 'App/Models/Image';
import { rm } from 'fs/promises';

export default class ImagesController {
  public async index({ request }: HttpContextContract) {
    return Image.query().paginate(request.input('page', 1), request.input('perPage', 12));
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { imageFile, category } = await request.validate({
      schema: schema.create({
        imageFile: schema.file(
          {
            size: '20mb',
            extnames: ['jpeg', 'jpg', 'gif', 'png'],
          },
          [rules.required()]
        ),
        category: schema.enum(['avatar', 'boxart', 'snap', 'title'], [rules.required()]),
      }),
    });

    if (imageFile.tmpPath) {
      let image = await Image.createFromLocalFile(imageFile.tmpPath, {
        userId: auth.user?.id,
        category: category as Image['category'],
      });

      if (image.fullId) {
        await image.load('full');
        image = image.full;
      } else {
        // PNG thumbnail for libretro
        await Image.createFromLocalFile(imageFile.tmpPath, {
          userId: auth.user?.id,
          fullId: image.id,
          category: category as Image['category'],
          type: 'png',
          maxWidth: category === 'boxart' ? 512 : 1280,
        });
        // WebP thumbnail for web app
        await Image.createFromLocalFile(imageFile.tmpPath, {
          userId: auth.user?.id,
          fullId: image.id,
          category: category as Image['category'],
          type: 'webp',
        });
      }
      await image.load('thumbs');

      await Activity.create({
        type: 'user',
        userId: auth.user!.id,
        targetType: 'image',
        targetId: image.id,
        action: 'upload',
      });

      // Remove tmp file to save disk space
      rm(imageFile.tmpPath);
      return image.full || image;
    } else {
      return response.abort('Fail to upload image', 422);
    }
  }

  public async show({}: HttpContextContract) {}

  public async destroy({ request, response, auth }: HttpContextContract) {
    if (auth.user?.role !== 'admin') {
      return response.unauthorized();
    }
    const image = await Image.find(request.param('id'));
    if (!image) {
      return response.notFound();
    }
    await Drive.delete(image?.path);
    await image.delete();
    await Activity.create({
      type: 'user',
      userId: auth.user?.id,
      targetType: 'image',
      targetId: image.id,
      action: 'delete',
      data: {},
    });
    return response.ok({});
  }
}
