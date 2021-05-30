<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Contact;
use App\Models\City;

class Agency extends Model
{
    protected $table = "agencies";

    public $timestamps = false;

    protected $fillable = [
        'name', 'address', 'city_id', 'phone_numbers', 'email', 'web'
    ];

    public function contacts()
    {
        return $this->hasMany(Contact::class, 'agency_id', 'id')->get();
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id')->first();
    }
}
