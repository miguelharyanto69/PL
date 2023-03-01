<?php 

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class ProfileController extends Controller {
    public function profile($id) {
         $find_user = User::find($id);

         if($find_user) {
            return response()->json($find_user, 200);
         }

         return response()->json(['message'=>'unauthorized'] , 400);
    }

    public function updateProfile(Request $request) {
        
    }
}