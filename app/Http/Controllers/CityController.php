<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\City;

class CityController extends Controller
{
    /**
     * Return json with countries and cities
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function citiesAndCountries()
    {
        $response = [
            'countries' => Country::all(),
            'cities'    => City::all()
        ];

        return response()->json($response);
    }
}
