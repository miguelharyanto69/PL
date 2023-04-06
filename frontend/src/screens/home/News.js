import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Footer , Navbar } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import light from "../../assets/image/light-bg.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const News = () => {
    const dispatch = useDispatch();
    const { admin } = useSelector(state=>state);

    return (
        <div className="w-full min-h-screen flex flex-col justify-between" style={{
            backgroundImage:`url(${light})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}>
            <Navbar/>
            <section className="w-[80%] mx-auto py-10">
                <h2 className="text-2xl font-bold text-white uppercase">news</h2>
                <Swiper  
                 spaceBetween={15}
                 autoplay={{
                   delay: 2500,
                   disableOnInteraction: true,
                 }}
                 pagination={{
                   clickable: true,
                 }}
                 slidesPerView={3}
                 loop={true}
                 navigation={false}
                 modules={[Autoplay, Pagination, Navigation]}
                className="mt-7 mySwiper">
                    {Array.isArray(admin.news) && admin.news.map((news,idx) => (
                        <SwiperSlide key={idx} className="w-full">
                            <img src={`http://127.0.0.1:8000/storage/news_image/${news?.thumbnail}`} className="w-full h-[210px] rounded-lg" />
                            <div className="mt-2">
                                <h5 className="text-white font-bold text-lg">{news?.title}</h5>
                                <p className="text-gray-300 text-sm mt-1">{news?.article?.substring(0,40)}...</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <Footer/>
        </div>
    )
}

export default News;