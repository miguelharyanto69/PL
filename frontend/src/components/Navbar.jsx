import React from 'react'
import navbar from "../assets/image/navbar-bg.png";
import logo from "../assets/image/logo.png";
import { Link,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { pathname } = useLocation();
  const { auth } = useSelector(state=>state);
 
  return (
    <nav style={{
        backgroundImage:`url(${navbar})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        objectFit:"cover"
    }} className='flex items-center px-14 justify-between h-[90px]'>
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
                <Link to="/">
                    <span className={`${pathname==="/news" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>News</span>
                </Link>
            </li>
            <li>
                <Link to="/">
                    <span className={`${pathname==="/movies" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>Movies</span>
                </Link>
            </li>

            <li>
                <Link to="/">
                    <span className={`${pathname==="/community" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>Community</span>
                </Link>
            </li>
            {auth.token && auth.token != 'null' ? <li>
                <Link to="/profile">
                <span className='w-[46px] h-[46px] rounded-full bg-orange-500 text-white uppercase font-bold text-xl flex items-center justify-center'>{auth?.user?.username?.charAt(0)}</span>
                </Link>
            </li> :     <li>
                <Link to="/auth/login">
                    <span className={`${pathname==="/auth/login" ? "text-orange-500" : "text-white"}  font-semibold text-[17px]`}>Sign In</span>
                </Link>
            </li>}
        
        </ul>
    </nav>
  )
}

export default Navbar