<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesAndCities extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('countries')->truncate();

        $countries = [
            ['name' => 'Serbia'],
            ['name' => 'United Kingdom'],
            ['name' => 'Germany'],
            ['name' => 'Austria'],
            ['name' => 'Japan'],
            ['name' => 'Mexico'],
        ];

        DB::table('countries')->insert($countries);

        // DB::table('cities')->truncate();

        $cities = [
            ['country_id' => 1, 'name' => 'Belgrade'],
            ['country_id' => 1, 'name' => 'Novi Sad'],
            ['country_id' => 1, 'name' => 'Kragujevac'],
            ['country_id' => 1, 'name' => 'Jagodina'],
            ['country_id' => 1, 'name' => 'Nis'],
            ['country_id' => 2, 'name' => 'Manchester'],
            ['country_id' => 2, 'name' => 'London'],
            ['country_id' => 2, 'name' => 'Liverpool'],
            ['country_id' => 2, 'name' => 'Sheffield'],
            ['country_id' => 2, 'name' => 'Peterborough'],
            ['country_id' => 3, 'name' => 'Frankfurt'],
            ['country_id' => 3, 'name' => 'Stuttgart'],
            ['country_id' => 3, 'name' => 'Nuremberg'],
            ['country_id' => 3, 'name' => 'Leipzig'],
            ['country_id' => 3, 'name' => 'Hanover'],
            ['country_id' => 4, 'name' => 'Vienna'],
            ['country_id' => 4, 'name' => 'Graz'],
            ['country_id' => 4, 'name' => 'Salzburg'],
            ['country_id' => 4, 'name' => 'Wels'],
            ['country_id' => 4, 'name' => 'Innsbruck'],
            ['country_id' => 5, 'name' => 'Hiroshima'],
            ['country_id' => 5, 'name' => 'Okayama'],
            ['country_id' => 5, 'name' => 'Osaka'],
            ['country_id' => 5, 'name' => 'Tokyo'],
            ['country_id' => 5, 'name' => 'Sendai'],
            ['country_id' => 6, 'name' => 'Mexico City'],
            ['country_id' => 6, 'name' => 'León'],
            ['country_id' => 6, 'name' => 'San Luis Potosí'],
            ['country_id' => 6, 'name' => 'Monterrey'],
            ['country_id' => 6, 'name' => 'Guadalajara'],
        ];

        DB::table('cities')->insert($cities);
    }
}
