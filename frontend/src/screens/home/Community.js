import { useState ,useEffect } from 'react';
import { fetchPersons } from '../../api';
import light from '../../assets/image/light-bg.png';
import dark from '../../assets/image/dark-bg.png';
import { Footer, Navbar } from '../../components';
import { BsFillChatLeftTextFill } from 'react-icons/bs';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Grid, Pagination,Autoplay,Navigation } from "swiper";

const Community = () => {
    const [persons,setPersons] = useState(null);

    useEffect(() => {
         fetchPersons(setPersons);
    },[])

    return (
        <div style={{
            backgroundImage:`url(${light})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }} className='w-full min-h-screen'>
            <Navbar/>
            <section className='w-full flex items-center justify-center'>
                <div className='w-[60%] my-10 mx-auto py-5 px-7 rounded-lg' style={{
                    backgroundImage:`url(${dark})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center'
                }}>
                    <h2 className='text-white font-bold text-xl uppercase'>community</h2>
                    <h5 className='text-md text-white font-semibold mt-5'>Ask a friend nearby to go watch movie</h5>

                    <div className='flex flex-col gap-y-5 mt-7'>
                        {persons?.slice(0,6)?.map((person, idx) => (
                            <div className='flex justify-between' key={idx}>
                                    <div className='flex items-center'>
                                        <img className='w-[70px] h-[70px] rounded-full' src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`}/>
                                        <div className='ml-7'>
                                            <h5 className='font-semibold text-sm text-white'>{person?.name}</h5>
                                            <div className='text-gray-300 mt-2'>
                                                {person.known_form ? <p>Unknown</p> : person?.known_for?.map((info, idx) => (
                                                     <span key={idx}>{info?.original_title}</span>
                                                ))}
                                            </div>
                                        </div>
                                     </div>
                                     <BsFillChatLeftTextFill className='text-3xl text-white'/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Community;