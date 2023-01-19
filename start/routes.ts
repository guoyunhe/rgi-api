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
Route.post('/logout', 'AuthController.logout').middleware('auth');
Route.post('/register', 'AuthController.register');
Route.get('/user', 'AuthController.user').middleware('auth');

Route.resource('series', 'SeriesController').apiOnly();
Route.resource('titles', 'TitlesController').apiOnly();
Route.resource('games', 'GamesController').apiOnly();
Route.resource('roms', 'RomsController').apiOnly();
Route.resource('images', 'ImagesController')
  .only(['index', 'store', 'show', 'destroy'])
  .middleware({
    store: ['auth'],
    destroy: ['auth'],
  });
Route.resource('users', 'UsersController').apiOnly();
