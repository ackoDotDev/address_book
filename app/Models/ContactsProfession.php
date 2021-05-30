<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactsProfession extends Model
{
    protected $table = "contacts_professions";

    public $timestamps = false;

    protected $fillable = [
        'contact_id', 'profession_id'
    ];
}
