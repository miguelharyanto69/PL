import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate , Link } from 'react-router-dom';
import { Navbar,Footer } from '../../components';
import light from "../../assets/image/light-bg.png";
import dark from "../../assets/image/dark-bg.png";
import { checkoutHandler } from "../../slices/TicketSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket,auth } = useSelector(state=>state);

  const [ticketData,setTicketData] = useState(JSON.parse(localStorage.getItem('tickets-info')));

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('tickets-info')) == null) {
       navigate("/movies");
    }
  },[ticketData]);

  const checkoutPayment = () => {
      dispatch(checkoutHandler({ checkoutData:ticketData , user_id:auth?.user?.id }));
  }


  return (
    <div 
    style={{
      backgroundImage:`url(${light})`,
      backgroundSize:"cover",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat"
   }}
    className='w-full min-h-screen'>
      <Navbar/>
      <section className="w-full py-10 min-h-screen flex justify-center items-center">
         {ticket.process ? (
            <div className="w-[42vw] rounded-md py-5 px-7 flex flex-col items-center justify-center" style={{
              backgroundImage:`url(${dark})`,
              backgroundSize:"cover",
              backgroundPosition:"center",
              backgroundRepeat:"no-repeat"
            }}>
             
             {ticket.loading ? <i class="ri-information-fill text-7xl text-blue-400"></i> :   <i class="ri-checkbox-circle-fill text-7xl text-green-400"></i>}
             <h2 className="text-2xl font-semibold text-white">{ticket.loading ? "Process Payment": "Payment Success"}</h2>
             <p className="text-center text-sm text-gray-200 mt-2">{new Date().toDateString()}</p>
             <Link to="/" className="w-full">
              <button className="w-full rounded-full bg-orange-500 text-white font-semibold py-3 mt-7">Back</button>
             </Link>
            </div>
         ) : (
          <div className="w-[42vw] rounded-md py-5 px-7" style={{
            backgroundImage:`url(${dark})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat"
          }}>
            <h2 className="text-2xl text-center text-white font-bold">Checkout</h2>
            <div className="mt-4 flex items-start gap-x-7 border-b border-gray-300 pb-5">
            <img  src={`https://image.tmdb.org/t/p/original/${ticketData?.thumbnail}`} className="w-[120px] h-[150px] rounded-md"/>
            <div className="flex flex-col gap-y-1">
              <h5 className="text-2xl font-semibold text-white">{ticketData?.title}</h5>
              <p className="text-gray-200 text-sm mt-1">Ayani XXI studios</p>
              <p className="text-gray-200 text-sm">Time {ticketData?.time}</p>
  
            </div>
            </div>
            <div className="pt-5 flex flex-col gap-y-4">
              <p className="text-gray-200 font-medium">Tickets : A{ticketData?.seats}</p>
              <p className="text-gray-200 font-medium">Price : {new Intl.NumberFormat('id-ID', {
                style:'currency',
                currency:'IDR'
              }).format(70000 * ticketData?.seats?.length)}</p>
              <p className="text-gray-200 font-medium">Fee : 4.000</p>
              <button onClick={checkoutPayment} className="w-full rounded-full text-sm text-white py-3 font-semibold bg-orange-500 mt-7">Confirm Payment</button>
            </div>
          </div>
         )}
      </section>
      <Footer/>
    </div>
  )
}

export default Checkout