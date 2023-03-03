<?php 

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AuthenticationController extends Controller {
    public function login(Request $request){
         $validate = $request->validate([
             'email'=>['required'],
             'password'=>['required' , 'min:6']
         ]);

         $find_user = User::where('email' , $request->email)->first();

         if(!$find_user) {
            return response()->json(['message'=>'Authentication failed , user not found'] , 401);
         }
 
         if (!$token = Auth::attempt($validate)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    public function register(Request $request) {
        $validate = $request->validate([
            'username'=>['required', 'min:6'],
            'email'=>['required' , 'unique:users'],
            'password'=>['required' , 'min:6'],
            'confirm'=>['required','same:password']
        ]);

        $created = User::create([
             'username'=>$request->username,
             'email'=>$request->email,
             'password'=>Hash::make($request->password)
        ]);

        if($created) {
            return response()->json(['message'=>'success create account'] , 200);
        }

        return response()->json(['message'=>'failed create account' , 400]);
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
        ]);
    }
}