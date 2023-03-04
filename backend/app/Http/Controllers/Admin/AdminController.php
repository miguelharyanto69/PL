<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


//models
use App\Models\News;
use App\Models\Spotlight;

class  AdminController extends Controller {
    public function all_news(){
        $news = News::with(['user'])->get();

        return response()->json($news,200);
    }

    public function all_spotlight(){
        $spotlights = Spotlight::with(['user'])->get();

        return response()->json($spotlights,200);
    }

    public function create_news(Request $request , $id){
        $validator = Validator::make($request->all() , [
            'thumbnail'=>['required', 'mimes:jpg,jpeg,png', 'max:2048'],
            'title'=>['required'],
            'article'=>['required']
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()->first()], 400);
        }

        $format_image = null;

        if($request->hasFile('thumbnail')){
            $storage = Storage::disk('news_image');

            $format_image = 'news_' . date("Y_M_D") . '_' . Str::random(12) . '.' . $request->file('thumbnail')->getClientOriginalExtension();

            $storage->putFileAs(null,$request->file('thumbnail'), $format_image,[]);
        }

        $created = News::create([
            'thumbnail'=>$format_image,
            'title'=>$request->title,
            'article'=>$request->article,
            'admin_id'=>$id
        ]);

        if($created) {
            return response()->json(['message'=>'success create news'], 200);
        }

        return response()->json(['message'=>'failed to create news'], 400);

    }
    
    public function create_spotlight(Request $request,$id){
        $validator = Validator::make($request->all() , [
            'thumbnail'=>['required', 'mimes:jpg,jpeg,png', 'max:2048'],
            'title'=>['required'],
            'article'=>['required']
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()->first()], 400);
        }

        $format_image = null;

        if($request->hasFile('thubmnail')){
            $storage = Storage::disk('spotlight_image');

            $format_image = 'news_' . date("Y_M_D") . '_' . Str::random(12) . '.' . $request->file('thumbnail')->getClientOriginalExtension();

            $storage->putFileAs(null,$request->file('thumbnail'), $format_image,[]);
        }

        $created = Spotlight::create([
            'thumbnail'=>$format_image,
            'title'=>$request->title,
            'article'=>$request->article,
            'admin_id'=>$id
        ]);

        if($created) {
            return response()->json(['message'=>'success create news'], 200);
        }

        return response()->json(['message'=>'failed to create spotlight'], 400);
    }
}