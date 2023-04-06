import React, { useEffect } from 'react'
import light from "../../assets/image/light-bg.png";
import dark from "../../assets/image/dark-bg.png";
import { Navbar,Footer } from '../../components';
import { useDispatch,useSelector } from 'react-redux';
import { getAllTickets } from '../../slices/TicketSlice';

const UserTickets = () => {
  const dispatch = useDispatch();
  const { ticket,auth } = useSelector(state=>state);
  
  useEffect(() => {
    dispatch(getAllTickets({ user_id:auth?.user?.id }));
  },[]); 

  return (
    <div className='w-full min-h-screen' style={{
      backgroundImage:`url(${light})`,
      backgroundSize:'cover',
      backgroundPosition:'center'
  }}> 
    <Navbar/>
     <section className='w-full min-h-screen'>
      <div className='w-[80%] mx-auto py-10'>
        <h2 className='text-white text-2xl font-bold'>Your Tickets</h2>
        <div className='mt-7 flex flex-col gap-y-3'>
        {ticket?.tickets?.map((ticket,idx) => (
          <div 
          style={{
            backgroundImage:`url(${dark})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}
          className='w-full flex items-center justify-between px-5 py-3' key={idx}>
           <div className='flex items-start gap-x-5'>
            <img src={`https://image.tmdb.org/t/p/original/${ticket?.thumbnail}`} className='w-[150px] h-[170px] rounded-md' />
            <div className='flex flex-col'>
              <h2 className='text-white font-bold text-xl'>{ticket?.title}</h2>
              <p className='text-gray-200 font-medium text-sm mt-2'>Seats : {ticket?.seats}</p>
              <p className='text-gray-200 font-medium text-sm mt-1'>Time : {ticket?.time}</p>
              <p className='text-gray-200 font-medium text-sm mt-1'>Address : Ayani XXI Studios</p>


            </div>
           </div>
          </div>
        ))}
      </div>
      </div>
    
     </section>
    <Footer/>
  </div>
  )
}

export default UserTickets