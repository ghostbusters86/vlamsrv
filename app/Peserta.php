<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Peserta extends Model
{
    protected $guarded = [];

    protected $hidden = [
    	'api_token','password'
    ];
}
