<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackCanva extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'cadastro_funcionario';
    protected $fillable = [
        'nome',
        'email',
        'setor',
        'administrador',
        'avaliacoes',
        'plano'
    ];
}
