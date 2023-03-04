import axios from "axios";
import React, { useRef, useState,useEffect } from "react";
import { Navbar,Footer } from "../../components";
import dark from "../../assets/image/dark-bg.png";
import light from "../../assets/image/light-bg.png";
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Grid, Pagination,Autoplay,Navigation } from "swiper";
import { fetchMovies } from "../../api";

const Movies = () => {
    const navigate = useNavigate();
    const { auth } = useSelector(state=>state);
    const dispatch = useDispatch();
    const [movies,setMovies] = useState(null);

    useEffect(() => {

      document.title = `Movies | All`;

      if(auth.token && auth.token != 'null') {
         fetchMovies('now_playing' , setMovies);
      } 
    },[auth]);

    return (
        <div className="w-full min-h-screen">
            <Navbar/>
            <section style={{
                backgroundImage:`url(${dark})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
            }} className="w-full px-20 py-10">
              <div className=" w-[80%] mx-auto">
              <h2 className="uppercase font-bold text-white text-2xl">movies</h2>
                   <Swiper
        slidesPerView={4}
        grid={{
          rows: 2,
          fill:"row"
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper mt-7"
      >
         {Array.isArray(movies) && movies.map((movie,idx) => (
           <Link key={idx} to={`/movie/${movie?.id}`}>
           <SwiperSlide className="cursor-pointer" key={idx}>
           <img className="w-full rounded-lg" src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} />
          </SwiperSlide>
           </Link>
         ))}
      </Swiper>
              </div>
            </section>
            <section className="w-full py-10 px-20" style={{
              backgroundImage:`url(${light})`,
              backgroundSize:'cover',
              backgroundPosition:'center'
            }}>
              <div className="w-[80%] mx-auto">
              <h2 className="uppercase font-bold text-white text-2xl">coming soon</h2>
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

                {Array.isArray(movies) && movies.map((movie,idx)=>(
                   <SwiperSlide className="cursor-pointer" key={idx}>
                   <Link to={`/movie/${movie.id}`}>
                   <img className="w-full rounded-lg" src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} />
                   </Link>
                </SwiperSlide>
                ))}
      </Swiper>
              </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Movies;