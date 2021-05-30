<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTypes extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users_types')->truncate();

        $users_types = [
            ['name' => 'admin'],
            ['name' => 'contact']
        ];

        DB::table('users_types')->insert($users_types);
    }
}
