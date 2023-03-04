import { useState,useEffect } from "react";
import navbar from "../assets/image/navbar-bg.png";
import logo from "../assets/image/logo.png";
import { Link,useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineUserCircle,HiOutlineTicket,HiOutlineUser } from 'react-icons/hi';
import { BsChatLeft } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { closeAlert } from "../slices/AlertSlice";
import { logoutHandler } from "../slices/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [openDropDown,setDropDown] = useState(false);
  const { pathname } = useLocation();
  const { auth } = useSelector(state=>state);

  useEffect(() => {
    setDropDown(false);
  }, []);
 
  return (
    <nav style={{
        backgroundImage:`url(${navbar})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        objectFit:"cover"
    }} className='flex items-center px-14 justify-between relative h-[90px]'>
        <Link to="/">
            <img src={logo} alt="logos" className='w-[150px]'/>
        </Link>
        <ul className='flex items-center justify-between gap-x-8'>
            <li>
                <Link to="/">
                    <span className={`${pathname==="/" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>Home</span>
                </Link>
            </li>
            <li>
                <Link to="/news">
                    <span className={`${pathname==="/news" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>News</span>
                </Link>
            </li>
            <li>
                <Link to="/movies">
                    <span className={`${pathname==="/movies" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>Movies</span>
                </Link>
            </li>

            <li>
                <Link to="/community">
                    <span className={`${pathname==="/community" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>Community</span>
                </Link>
            </li>
            {auth.token && auth.token != 'null' ? 
            <li className="cursor-pointer" onClick={()=>setDropDown(!openDropDown)}>
                <span className='w-[46px] h-[46px] rounded-full bg-orange-500 text-white uppercase font-bold text-xl flex items-center justify-center'>{auth?.user?.username?.charAt(0)}</span>
            </li> :   <li>
                <Link to="/auth/login">
                    <span className={`${pathname==="/auth/login" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>Sign In</span>
                </Link>
            </li>}
        
        </ul>
       {openDropDown ? (
         <div className='bg-white py-4 px-10 rounded-lg flex flex-col gap-y-3 absolute -bottom-[190px] right-12'>
          <Link to="/profile" className="flex items-center gap-x-3 text-gray-600">
             <HiOutlineUserCircle className="text-xl"/>
             <p>Profile</p>
          </Link>
          <Link to="/" className="flex items-center gap-x-3 text-gray-600">
             <HiOutlineTicket className="text-xl"/>
             <p>Tickets</p>
          </Link>
          <Link to="/" className="flex items-center gap-x-3 text-gray-600">
             <BsChatLeft className="text-xl"/>
             <p>Chat</p>
          </Link>
          {auth?.user?.isAdmin === 1 ? (
             <Link to="/admin" className="flex items-center gap-x-3 text-gray-600">
                <HiOutlineUser className="text-xl" />
                <p>Admin</p>
             </Link>
          ) : null}
          <button onClick={()=>dispatch(logoutHandler())} className="flex items-center gap-x-3 text-gray-600">
             <IoIosLogOut className="text-xl"/>
             <p>Logout</p>
          </button>
         </div>
       ) : null}
    </nav>
  )
}

export default Navbar