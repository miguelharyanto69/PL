import { useState } from 'react';
import { Footer, Navbar } from "../../components";
import dark from "../../assets/image/dark-bg.png";
import peoples from '../../constants/people';

const Chat = () => {
    return (
        <div className='w-full min-h-screen'>
            <Navbar/>
            <section className='w-full h-screen flex items-stretch'>
                <div className='w-[30%] h-screen' style={{
                    backgroundImage:`url(${dark})`,
                    backgroundSize:'cover',
                    backgroundRepeat:'no-repeat',
                    backgroundPosition:'center'
                }}>
                 {peoples.map((people, idx) => (
                    <div key={idx} className="w-full py-3 border-t border-b border-gray-500 px-3 flex items-start justify-between">
                       <div className='flex items-center'>
                       <img src={people.profile} className="w-[50px] h-[50px] rounded-full"/>
                       <div className='ml-5'>
                         <h5 className='text-white font-semibold'>{people?.name}</h5>
                         <p className='text-gray-300 text-sm'>{people?.message}</p>
                       </div>
                       </div>
                       <h5 className='text-[10px] font-normal text-gray-300'>12 : 45 PM</h5>
                    </div>
                 ))}
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Chat;