<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersType extends Model
{
    protected $table = "users_types";

    public $timestamps = false;

    protected $fillable = [
        'name'
    ];
}
