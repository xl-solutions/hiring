
'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'TestControlerController.index');

Route.get('/search', 'TestControlerController.search');

Route.get('/value', 'TestControlerController.value');
