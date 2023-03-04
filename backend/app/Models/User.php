<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

//models
use App\Models\Spotlight;
use App\Models\News;

class User extends Authenticatable implements JWTSubject
{
    use  Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'favorite_genres',
        'gender',
        'birthday',
        'city',
        'phone',
        'avatar',
        'description',
        'isAdmin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function spotlights(){
        if($this->isAdmin == 1) {
            return $this->hasMany(Spotlight::class,'admin_id', 'id');
        }
    }

    public function news(){
        if($this->isAdmin == 1) {
            return $this->hasMany(News::class,'admin_id', 'id');
        }
    }

    public function getJWTIdentifier() {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [
            'username'=>$this->username,
            'id'=>$this->id,
            'email'=>$this->email,
            'isAdmin'=>$this->isAdmin
        ];
    }    
}
