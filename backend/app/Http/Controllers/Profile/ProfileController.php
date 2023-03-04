<?php 

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class ProfileController extends Controller {
    public function profile($id) {
         $find_user = User::find($id);

         if($find_user) {
            return response()->json($find_user, 200);
         }

         return response()->json(['message'=>'unauthorized'] , 400);
    }

    public function updateProfile(Request $request, $id) {
         $find_user = User::find($id);

         if(!$find_user) {
             return response()->json(['message'=>'Unauthorized']);
         }

         $updated = User::where('id' ,$id)->update([
             'birthday'=>$request->birthday,
             'gender'=>$request->gender,
             'phone'=>$request->phone,
             'description'=>$request->description,
             'city'=>$request->city,
         ]);

         if($updated) {
            return response()->json($find_user, 200);
         }

         return response()->json(['message'=>'Failed to update profile!'] , 400);
           
    }

    public function updateAvatar(Request $request,$id) {
        if(!$id) {
            return response()->json(['message'=>'failed upload image']);
        }

        // $validate = Validator::make($request->only('avatar'), [
        //       'avatar'=>['required','mimes:jpeg,png,jpg,gif' ,'size:2048'],
        // ]);

        // if($validate->fails()){
        //     return response()->json(['message'=>$validate->errors()->first()], 400);
        // }

        $format_image = null;
        $find_user = User::find($id);

        if($request->has('avatar')){
            $storage = Storage::disk('profile_image');

            if($find_user->avatar  != null && $storage->exists($find_user->avatar)){
                $storage->delete($find_user->avatar);
            }
 
            $format_image =  date("Y_M_D") . '_' . Str::random(12) . '.' . $request->file('avatar')->getClientOriginalExtension() ;

            
            $storage->putFileAs(null , $request->file('avatar'), $format_image ,[]);
        }

        
        $find_user->avatar = $format_image;

        $saved = $find_user->save();

        if($saved && $format_image) {
            return response()->json(['avatar'=>$format_image]);
        }

        return response()->json(['message'=>'failed upload photo'] , 400);
    }
}