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

    public function __construct() {

    }
    public function all_news(){
        $news = News::with(['user'])->orderByDesc('created_at')->get();

        return response()->json($news,200);
    }

    public function all_spotlight(){
        $spotlights = Spotlight::with(['user'])->orderByDesc('created_at')->get();

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

        if($request->hasFile('thumbnail')){
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

    public function deleteNews($id) {
         $find_news = News::where('id',$id);

         if($find_news->first()) {
            $deleted = $find_news->delete();

            if($deleted) {
                return response()->json(['message'=>'success delete news']);
            }
         }
    }
    
    public function deleteSpotlight($id) {
        $find_spotlight = Spotlight::where('id',$id);

        if($find_spotlight->first()) {
           $deleted = $find_spotlight->delete();

           if($deleted) {
               return response()->json(['message'=>'success delete news']);
           }
        }
   }

   public function updateSpotlight(Request $request , $id) {
      $find_spotlight = Spotlight::find($id);
      $format_image = null;

      if($find_spotlight) {
        if($request->hasFile('thumbnail')) {
            $storage = Storage::disk();
            if($storage->exists($find_spotlight->thumbnail)) {
               $storage->delete($find_spotlight->thumbnail);
            }

            $format_image = 'news_' . date("Y_M_D") . '_' . Str::random(12) . '.' . $request->file('thumbnail')->getClientOriginalExtension();

            $storage->putFileAs(null,$request->file('thumbnail'), $format_image,[]);
           
        }

        $find_spotlight->title = $request->title;
        $find_spotlight->article = $request->article;
        $find_spotlight->thumbnail = $format_image != null ? $format_image  : $find_spotlight->thumbnail;

        $saved = $find_spotlight->save();

        return response()->json($find_spotlight, 200);
    }

    return response()->json(['message'=>'failed update'],400);
   }

   public function updateNews(Request $request, $id) {
     $find_news = News::find($id);
     $format_image = null;

     if($find_news) {
         if($request->hasFile('thumbnail')) {
             $storage = Storage::disk();
             if($storage->exists($find_news->thumbnail)) {
                $storage->delete($find_news->thumbnail);
             }
 
             $format_image = 'news_' . date("Y_M_D") . '_' . Str::random(12) . '.' . $request->file('thumbnail')->getClientOriginalExtension();

             $storage->putFileAs(null,$request->file('thumbnail'), $format_image,[]);
            
         }

         $find_news->title = $request->title;
         $find_news->article = $request->article;
         $find_news->thumbnail = $format_image != null ? $format_image  : $find_news->thumbnail;

         $saved = $find_news->save();

         return response()->json($find_news, 200);
     }
   }

   public function detail(Request $request,$id){
      if($request->query('page')==="spotlight"){
        $find_spotlight = Spotlight::with(['user'])->where('id',$id);

        return response()->json($find_spotlight->first(),200);
      } else{
        $find_news = News::with(['user'])->where('id',$id);

        return response()->json($find_news->first(),200);
      }
   }
}