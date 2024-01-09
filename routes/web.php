<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CadastroController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('user', [UserController::class,'getUserData']);


// Rota para o login
Route::get('/', function () {
    return view('../auth/login');
});



// Middleware
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    // Configuração das páginas que poderão ser somente acessadas após o login
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/welcome', function () {
        return view('welcome');
    })->name('welcome');

    // Endpoint para recuperar os dados do usuário
    Route::get('/api/user', [UserController::class, 'getUserData']);

    Route::get('/colaboradores-atestado', [CadastroController::class, 'getAllColaboradoresAtestado']);

    Route::post('/cadastrar-usuario', [CadastroController::class, 'createCadastro'])->name('cadastrar.usuario');

    Route::get('/cadastrados', [CadastroController::class, 'getAllCadastro']);

    Route::put('/cadastro/{id}/update-avaliacao', [CadastroController::class, 'updateAvaliacao']);

    Route::delete('/deleteFuncionario/{id}', [CadastroController::class, 'deleteFuncionario']);

    Route::put('/funcionario/{id}', [CadastroController::class, 'update']);

    Route::get('/cadastro/{email}', [CadastroController::class, 'getCadastroByEmail']);


});