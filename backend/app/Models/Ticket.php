<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'tickets';

    protected $fillable = [
        'user_id',
        'title',
        'price',
        'seats',
        'time',
        'thumbnail'
    ];

    public function user() {
        return $this->hasOne(User::class, 'id' , 'user_id');
    }
}
