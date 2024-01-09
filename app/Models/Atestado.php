<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atestado extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'colaboradores';
    protected $fillable = [
        'nome',
        'setor'
    ];

}
