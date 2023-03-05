import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate , Link } from 'react-router-dom';
import avatar from "../../assets/image/avatar.jpg";
import { Navbar,Footer } from "../../components";
import light from "../../assets/image/light-bg.png";
import dark from "../../assets/image/dark-bg.png";
import axios from 'axios';
import { fetchMovies } from "../../api";
import { FiTrash,FiEdit3 } from 'react-icons/fi';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";


const Homepage = () => {
   const navigate = useNavigate();
   const [loading,setLoading] = useState(false);
   const [nowShowing,setNowShowing] = useState([]);
   const [upComing,setUpComing] = useState([]);
   const { auth,admin } = useSelector(state=>state);

   useEffect(()=>{
     document.title = "Homepage";
    fetchMovies('now_playing',setNowShowing);
     fetchMovies('upcoming',setUpComing);
   },[auth]);

    return (
        <div
         style={{
            backgroundImage:`url(${light})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat"
         }}
         className="w-full min-h-screen">
            <section style={{
                backgroundImage:`url(${avatar})`,
                backgroundSize:"cover",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat",
                objectFit:"cover"
            }} className="w-full h-screen relative">
                <Navbar/>
                <button className="absolute bottom-[210px] left-[360px] bg-orange-500 text-white capitalize text-md py-3 px-8 rounded-full font-medium">get tickets now</button>
            </section>
            <section className="py-20 px-20">
                <h2 className="text-xl uppercase font-bold text-white">Now showing in cinemas</h2>
            <Swiper
        spaceBetween={15}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={5}
        loop={true}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mt-8"
      >
        {nowShowing?.map((movie,idx) => (
        <SwiperSlide key={idx}>
           <Link to={`/movie/${movie.id}`}>
           <img className="w-full rounded-lg" src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} />
           </Link>
        </SwiperSlide>
        ))}       
      </Swiper>
            </section>
            <section
             style={{
                backgroundImage:`url(${dark})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat'
             }}
             className="w-full py-20 px-20">
                <h2 className="text-xl uppercase font-bold text-white">spotlight</h2>
                {admin?.spotlight?.length == 0 && auth?.user?.isAdmin ? <div className="flex justify-center items-center">
                  <Link to="/admin/create">
                    <button className="mt-7 bg-orange-500 text-white font-semibold  py-2 px-5 rounded-full">Create Spotlight</button>
                  </Link>
                </div> : (
                      <Swiper  
                      spaceBetween={15}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      slidesPerView={4}
                      loop={true}
                      navigation={false}
                      modules={[Autoplay, Pagination, Navigation]}
                     className="mt-7 mySwiper">
                         {Array.isArray(admin.spotlight) && admin.spotlight.map((spotlight,idx) => (
                           <SwiperSlide className="w-full">
                                <Link key={idx}  to={`/detail/spotlight/${spotlight?.id}`}>
                                 <img src={`http://127.0.0.1:8000/storage/spotlight_image/${spotlight?.thumbnail}`} className="w-full h-[210px] rounded-lg" />
                                 <div className="mt-2">
                                     <h5 className="text-white font-bold text-lg">{spotlight?.title}</h5>
                                     <p className="text-gray-300 text-sm mt-1">{spotlight?.article?.substring(0,40)}...</p>
                                 </div>
                                
                           </Link>
                             </SwiperSlide>
                         ))}
                     </Swiper>
                )}
             </section> 
             <section className="py-20 px-20">
             <h2 className="text-xl uppercase font-bold text-white">coming soon</h2>
             <Swiper
        spaceBetween={15}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={5}
        loop={true}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mt-8"
      >
        {upComing?.map((movie,idx) => (
        <SwiperSlide key={idx}>
           <Link to={`/movie/${movie.id}`}>
           <img className="w-full rounded-lg" src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} />
           </Link>
        </SwiperSlide>
        ))}       
      </Swiper>
             </section>
             <Footer/>
        </div>
    )
};

export default Homepage;