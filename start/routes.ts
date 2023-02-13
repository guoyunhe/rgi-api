/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'AuthController.login');
Route.post('/register', 'AuthController.register');

Route.group(() => {
  Route.post('/logout', 'AuthController.logout');
  Route.get('/user', 'AuthController.user');
  Route.post('/user/avatar', 'AuthController.storeAvatar');
  Route.delete('/user/avatar', 'AuthController.destroyAvatar');
}).middleware('auth');

Route.resource('platforms', 'PlatformsController').apiOnly();
Route.resource('series', 'SeriesController').apiOnly();
Route.resource('titles', 'TitlesController').apiOnly();
Route.resource('games', 'GamesController').apiOnly();
Route.resource('games.images', 'ImagesController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  });
Route.resource('roms', 'RomsController').apiOnly();
Route.resource('activities', 'ActivitiesController').apiOnly();
Route.resource('users', 'UsersController').apiOnly();
