import React, { useState } from 'react';
import { useSelector } from "react-redux";
import light from "../../assets/image/light-bg.png";
import { Navbar,Footer } from '../../components';
import dark from "../../assets/image/dark-bg.png";

const PickSeats = () => {
  return (
    <div className='w-full min-h-screen' style={{
        backgroundImage:`url(${light})`,
        backgroundSize:'cover',
        backgroundPosition:'center'
    }}>
        <Navbar/>
        PickSeats
        <Footer/>
        </div>
  )
}

export default PickSeats