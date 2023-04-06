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
                <div className="w-[70%] relative">
                    <div className="flex items-center py-3 border-b border-gray-400 px-5 gap-x-3">
                    <img className='w-[60px] h-[60px] rounded-full' src={peoples[0].profile} alt="profile" />
                    <div className='flex flex-col'>
                        <h5 className='text-lg font-bold'>Maria Smith</h5>
                        <p className='text-[13px] text-gray-400 font-medium'>Last seen 12:00PM</p>
                    </div>
                    </div>
                    <div className="py-10 px-5 flex flex-col gap-y-4 w-full">
                     <button className="bg-blue-500 self-end w-[230px] text-left text-white py-2 px-4 rounded-full">Hey dude what's up </button>
                    <button className="bg-blue-500 self-end w-[230px] text-left text-white py-2 px-4 rounded-full">Did you see my profile? </button>
                    <button className="bg-gray-100 self-start w-[230px] text-left text-black py-2 px-4 rounded-full">Not yet </button>
                    <button className="bg-blue-500 self-end w-[230px] text-left text-white py-2 px-4 rounded-full">Okay </button>

                    </div>

                   <div className='w-full absolute py-3 px-5 bottom-0 left-0 border border-gray-400 flex items-center justify-center gap-x-5'>
                     <button className='text-gray-500'>
                        <i class="ri-attachment-line text-2xl"></i>
                     </button>
                    <div className='w-[90%] relative'>
                    <input type="text" className='w-full py-2 px-3 rounded-full bg-gray-100'/>
                    <i class="ri-user-smile-line text-gray-500 absolute top-1 text-2xl right-5"></i>
                    </div>
                     <button className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-orange-500 text-white">
                     <i class="ri-send-plane-fill text-xl"></i>
                     </button>
                   </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Chat;