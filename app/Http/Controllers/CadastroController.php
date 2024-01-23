<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cadastro;
use App\Models\Atestado;
use App\Models\Setor;
use App\Models\FeedbackCanva;

class CadastroController extends Controller
{
    public function mostrarFormularioRegistro()
    {
        $setores = Setor::pluck('setor', 'id')->toArray();
        return view('auth.register', compact('setores'));
    }



     public function getResponsavelCadastro($setor) {
        $cadastro = Setor::where('setor', $setor)->first();
    
        if ($cadastro) {
            return response()->json($cadastro->name, 200);
        } else {
            return response()->json(['message' => 'Cadastro não encontrado para o setor fornecido'], 404);
        }
    }

    public function updatePlano(Request $request, $id) {
        if (FeedbackCanva::where('id', $id)->exists()) {
          $funcionario = FeedbackCanva::find($id);
          $funcionario->plano = is_null($request->plano) ? $funcionario->plano : $request->plano;
          $funcionario->save();
    
          return response()->json([
              "message" => "records updated successfully"
          ], 200);
          } else {
          return response()->json([
              "message" => "Plano not found"
          ], 404);
      }
      }


    public function getAllCadastro() {
        $cadastro = Cadastro::get()->toJson(JSON_PRETTY_PRINT);
     return response($cadastro, 200);
     }

     public function getAllCadastroFeedback($email) {
        $feedback = FeedbackCanva::where('email', $email)->first();

        if (!$feedback) {
            return response()->json(['message' => 'Nenhum feedback encontrado para o email fornecido.'], 404);
        }

        return response()->json($feedback);
     }

     public function getCadastroByEmail($email) {
        $cadastro = Cadastro::where('email', $email)->first();
    
        if ($cadastro) {
            return response()->json($cadastro, 200);
        } else {
            return response()->json(['message' => 'Cadastro não encontrado para o email fornecido'], 404);
        }
    }
    

     public function getAllColaboradoresAtestado() {
      $atestado = Atestado::get()->toJson(JSON_PRETTY_PRINT);
   return response($atestado, 200);
   }
 
     public function createCadastro(Request $request)
    {

          // Validação dos dados recebidos
  //   $validatedData = $request->validate([
  //     'nome' => 'required|string|max:255',
  //     'email' => 'required|email|unique:cadastro_funcionario,email',
  //     'setor' => 'required|string|max:100',
  //     'administrador' => 'required|string|max:500',
  // ]);

        // Criar um novo usuário com base nos dados recebidos
        $user = new Cadastro;
        $user->nome = $request->nome;
        $user->email = $request->email;
        $user->setor = $request->setor;
        $user->administrador = $request->administrador;

        // Salvar o novo usuário no banco de dados
        $user->save();

        return $request;

  
    }
 
 
     public function updateAvaliacao(Request $request, $id) {
       if (Cadastro::where('id', $id)->exists()) {
         $funcionario = Cadastro::find($id);
         $funcionario->avaliacoes = is_null($request->avaliacoes) ? $funcionario->avaliacoes : $request->avaliacoes;
         $funcionario->save();
 
         return response()->json([
             "message" => "records updated successfully"
         ], 200);
         } else {
         return response()->json([
             "message" => "Description not found"
         ], 404);
     }
     }

     public function update(Request $request, $id) {
      if (Cadastro::where('id', $id)->exists()) {
          $funcionario = Cadastro::find($id);
  
          // Verifica cada campo no request e atualiza se estiver presente
          if ($request->has('nome')) {
              $funcionario->nome = $request->nome;
          }
          if ($request->has('email')) {
              $funcionario->email = $request->email;
          }
          if ($request->has('setor')) {
              $funcionario->setor = $request->setor;
          }
          // Adicione outros campos conforme necessário
  
          $funcionario->save();
  
          return response()->json([
              "message" => "records updated successfully"
          ], 200);
      } else {
          return response()->json([
              "message" => "Description not found"
          ], 404);
      }
  }
  

     
 
     public function deleteFuncionario ($id) {
        if(Cadastro::where('id', $id)->exists()) {
         $funcionario = Cadastro::find($id);
         $funcionario->delete();
 
         return response()->json([
           "message" => "records deleted"
         ], 202);
       } else {
         return response()->json([
           "message" => "Description not found"
         ], 404);
       }
     }
}
