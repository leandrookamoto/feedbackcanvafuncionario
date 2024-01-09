<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //Função para recuperar todos os usuários
    // public function getAllUser() {
    //     $user = User::get()->toJson(JSON_PRETTY_PRINT);
    //  return response($user, 200);
    //  }


    public function getUserData()
    {
        // Recupera o usuário autenticado
        $user = Auth::user();

        if ($user) {
            // Retorna os dados do usuário em formato JSON
            return response()->json([
                'name' => $user->name,
                'email' => $user->email,
                'setor' => $user->setor,
                'responsavel' => $user->responsavel,

            ]);
        } else {
            // Retorna uma resposta adequada caso não haja usuário autenticado
            return response()->json(['error' => 'Nenhum usuário autenticado'], 401);
        }
    }
}
