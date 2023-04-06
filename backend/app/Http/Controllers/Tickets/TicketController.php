<?php 

namespace App\Http\Controllers\Tickets;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;


use App\Models\Ticket;
use App\Models\User;

class TicketController extends Controller {
    public function allTickets(){

    }

    public function refundTicket() {

    }

    public function checkoutHandler(Request $request) {
        try {

            $ticket_create = Ticket::create([
                'user_id'=>$request->user_id,
                'price'=>$request->price,
                'seats'=>$request->seats,
                'time'=>$request->time,
                'thumbnail'=>$request->thumbnail,
                'title'=>$request->title 
            ]);

            if($ticket_create) {
                $all_tickets = User::with(['tickets'])->where('id',$request->user_id)->get();

                return response()->json($all_tickets,200);
            }

        } catch(DecryptException $e) {
            return response()->json(['message'=>$e->getMessage()] ,500);
        }
    }
}