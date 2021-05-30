<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AgencyController as Agency;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ProfessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(
    [
        'prefix' => 'auth/',
    ],
    function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);

        Route::group(
            [
                'middleware' => 'jwt'
            ],
            function () {
                Route::post('logout', [AuthController::class, 'logout']);
                Route::get('user', [AuthController::class, 'userProfile']);
                Route::post('update', [AuthController::class, 'updateUser']);
            }
        );
    }
);
// Route::group(
//     ['middleware' => 'jwt'],
//     function () {
Route::get('agencies/list', [Agency::class, 'list']);
Route::get('cities', [CityController::class, 'citiesAndCountries']);
Route::get('professions', [ProfessionController::class, 'professions']);

Route::resource('agencies', AgencyController::class, ['except' => [
    'index', 'create', 'edit'
]]);
Route::resource('contacts', ContactController::class, ['except' => [
    'index', 'create', 'edit'
]]);
//     }
// );
