<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//controller
use App\Http\Controllers\Auth\AuthenticationController;

//auth prefix

Route::group(['prefix'=>'/auth'],function(){
     Route::post('/login', [AuthenticationController::class, 'login'])->name('login');
     Route::post('/register', [AuthenticationController::class, 'register'])->name('register');

}); 

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
