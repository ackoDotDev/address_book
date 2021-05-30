<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ContactsProfession;
use App\Models\Profession;

class Contact extends Model
{
    protected $table = "contacts";

    public $timestamps = false;

    protected $fillable = [
        'first_name', 'last_name', 'agency_id', 'phone_numbers', 'email', 'web', 'avatar'
    ];

    public function professions()
    {
        return $this->belongsToMany(Profession::class, "contacts_professions", 'contact_id', 'profession_id')->get();
    }
}
