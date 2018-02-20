<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

//GET
Route::get('/', function () {
    return view('welcome');
});
Route::get('/celulares', 'CelularController@uploadForm');

//POST
Route::post('/filters', 'CelularController@filters');
Route::post('/upload', 'CelularController@uploadSubmit');