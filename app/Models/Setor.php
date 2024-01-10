<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setor extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'users';
    protected $fillable = [
        'name',
        'setor',
        'id'
    ];

}
