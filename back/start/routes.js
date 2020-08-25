
'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/probe', 'ProbeController.probe');

Route.group(() => {

    Route.get('/:stock_name/quote', 'TestControlerController.quote');

    Route.get('/:stock_name/history', 'TestControlerController.history');

    Route.get('/:stock_name/compare', 'TestControlerController.compare');

    Route.get('/:stock_name/gains', 'TestControlerController.gains');

    Route.get('/search', 'TestControlerController.search');

}).prefix('/stocks')
