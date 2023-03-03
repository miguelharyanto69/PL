<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//controller
use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\Profile\ProfileController;


//auth prefix

Route::group(['prefix'=>'/auth'],function(){
     Route::post('/login', [AuthenticationController::class, 'login'])->name('login');
     Route::post('/register', [AuthenticationController::class, 'register'])->name('register');

}); 

Route::group(['prefix'=>'/profile'] , function(){
     Route::get('{id}', [ProfileController::class, 'profile'])->name('profile');
     Route::put('/update/{id}', [ProfileController::class, 'updateProfile'])->name('profile.update');
     Route::put('/update/avatar/{id}', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
