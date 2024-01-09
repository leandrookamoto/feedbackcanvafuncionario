<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cadastro extends Model
{

    protected $connection = 'mysql';
    protected $table = 'cadastro_funcionario';
    protected $fillable = [
        'nome',
        'email',
        'setor',
        'administrador',
        'avaliacoes'
    ];
}

