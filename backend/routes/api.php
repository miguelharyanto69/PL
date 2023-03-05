<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//controller
use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Admin\AdminController;


//auth prefix

Route::group(['prefix'=>'/auth'],function(){
     Route::post('/login', [AuthenticationController::class, 'login'])->name('login');
     Route::post('/register', [AuthenticationController::class, 'register'])->name('register');

}); 

Route::group(['prefix'=>'/profile'] , function(){
     Route::get('{id}', [ProfileController::class, 'profile'])->name('profile');
     Route::put('/update/{id}', [ProfileController::class, 'updateProfile'])->name('profile.update');
     Route::post('/update/avatar/{id}', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
});

Route::group(['prefix'=>'/admin'] ,function(){
     Route::get('/all/news', [AdminController::class, 'all_news'])->name('all.news');
     Route::get('/all/spotlight', [AdminController::class,'all_spotlight'])->name('all.spotlight');

     //create spotlight & news
     Route::post("/create/news/{id}", [AdminController::class,'create_news'])->name('create.news');
     Route::post("/create/spotlight/{id}", [AdminController::class,"create_spotlight"])->name('create.spotlight');  

     //delete spotlight & news
     Route::delete('/delete/news/{id}',[AdminController::class,'deleteNews']);
     Route::delete('/delete/spotlight/{id}',[AdminController::class,'deleteSpotlight']);
     
     //update spotlight & news
     Route::post("/update/news/{id}",[AdminController::class,'updateNews']);
     Route::post("/update/spotlight/{id}",[AdminController::class,'updateSpotlight']);

     //detail
     Route::get('/detail/{id}',[AdminController::class,'detail']);

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
