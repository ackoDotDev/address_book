<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Professions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = [
            ['name' => 'Pekar'],
            ['name' => 'Lekar'],
            ['name' => 'Apotekar'],
            ['name' => 'Mogao'],
            ['name' => 'Sam'],
            ['name' => 'Biti'],
            ['name' => 'Ja'],
            ['name' => 'Bilo'],
            ['name' => 'Sta'],
        ];

        DB::table('professions')->insert($countries);
    }
}
