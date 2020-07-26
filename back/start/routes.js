
'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'TestControlerController.index');

Route.group(() => {

    Route.get('/:stock_name/quote', 'TestControlerController.quote');

}).prefix('/stocks')


Route.get('/search', 'TestControlerController.search');

Route.get('/value', 'TestControlerController.value');

Route.get('/values', 'TestControlerController.values');

Route.get('/historic', 'TestControlerController.historic');
