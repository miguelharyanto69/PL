import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import light from "../../assets/image/light-bg.png";
import { Navbar,Footer } from '../../components';
import dark from "../../assets/image/dark-bg.png";
import { useNavigate } from 'react-router-dom';

const PickSeats = () => {
  const seats = [];
  const navigate=  useNavigate();
  const [seatPicks,setSeatPicks] = useState([]);
  const [open,setOpen] = useState(false);

  for(let i = 0; i < 100; i++) {
    seats.push(i);
  }

  const chooseSeats = (value) => {
      if(seatPicks.includes(value)) return;

      setSeatPicks([...seatPicks,`A${value}`]);

      setOpen(true);
  }

 const checkoutRedirect = () => {
      const ticketsInfo = JSON.parse(localStorage.getItem('tickets-info'));
      localStorage.setItem('tickets-info' , JSON.stringify({...ticketsInfo,  seats:seatPicks.join(",") }));

      navigate("/tickets/checkout");
 }

  return (
    <div className='w-full min-h-screen' style={{
        backgroundImage:`url(${light})`,
        backgroundSize:'cover',
        backgroundPosition:'center'
    }}>
        <Navbar/>
         <section className="w-[90%] mx-auto py-12 flex items-start justify-between">
            <div className="grid grid-cols-8 gap-4">
              {seats.slice(0,39).map((seat,idx) => (
                <button onClick={()=>chooseSeats(seat)} className={`text-sm w-full border-2 ${seatPicks[idx] == seat ? "bg-white" : "border-white"} rounded-md ${seatPicks[idx]  == seat ? "text-black" : "text-white"} font-semibold py-2 px-3`} key={idx}>A{seat+1}</button>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-4">
              {seats.slice(40,79).map((seat,idx) => (
                <button onClick={()=>chooseSeats(seat,idx)} className={`text-sm w-full border-2 ${seatPicks[idx] == seat ? "bg-white" : "border-white"} rounded-md ${seatPicks[idx]  == seat ? "text-black" : "text-white"} font-semibold py-2 px-3`} key={idx}>A{seat}</button>
              ))}
            </div>
         </section>
         <div className='mb-10 w-[90%] mx-auto'>
          <button className='bg-gray-200 font-semibold capitalize w-full rounded-sm py-2'>cinema screen</button>
          {open && (
            <div className='flex mt-7 justify-between items-center bg-blue-700 rounded-lg w-full py-3 text-white px-5'>
            <div className='flex items-center gap-x-10'>
              <div>
               <p>Price</p>
               <h5 className='font-bold text-2xl'>70.000</h5>
              </div>
              <div>
               <p>Seats</p>
                <h5 className='font-bold text-2xl'>
                {seatPicks.map((seat,idx)=> `A${seat}`).join(",")}
                </h5>
              </div>
            </div>
            <button onClick={()=>checkoutRedirect()} className='rounded-full bg-orange-500 text-white font-semibold py-2 px-10'>Checkout</button>
           </div>
          )}
         </div>
        <Footer/>
        </div>
  )
}

export default PickSeats