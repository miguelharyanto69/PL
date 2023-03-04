<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

//models
use App\Models\User;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'cover',
        'article',
        'thumbnail',
        'admin_id'
    ];

    public function user() {
        return $this->hasOne(User::class,'id', 'admin_id');
    }
}
