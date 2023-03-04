import { useSelector ,useDispatch } from 'react-redux';
import { Navbar,Footer } from "../../components";
import light from "../../assets/image/light-bg.png";
import dark from "../../assets/image/dark-bg.png";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { FiTrash,FiEdit3 } from 'react-icons/fi';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const HomeAdmin = () => {
    const { admin } = useSelector(state=>state);

    return (
        <div className='w-full min-h-screen flex flex-col justify-between' style={{
            backgroundImage:`url(${light})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}>
            <Navbar/>
            <div className='w-full min-h-[70vh] py-6'>
            <div className='w-full flex py-3 px-20 justify-between items-center mb-10'>
            <h1 className='text-2xl font-bold text-white capitalize'>admin page</h1>
            <Link to="/admin/create">
                <button className='py-2 bg-orange-500 px-5 rounded-full text-md font-semibold text-white'>Upload</button>
            </Link>
        </div>
            {admin?.spotlight?.length > 1 ? (
                    <section className='w-[80%] mx-auto'>
                  
                 </section>
            ) : null}
             <section className='w-full px-20 mx-auto'>
              <h2 className='text-2xl text-white font-bold capitalize'>News</h2>
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
                    {Array.isArray(admin.news) && admin.news.map((news,idx) => (
                        <SwiperSlide key={idx} className="w-full">
                            <img src={`http://127.0.0.1:8000/storage/news_image/${news?.thumbnail}`} className="w-full h-[210px] rounded-lg" />
                            <div className="mt-2">
                                <h5 className="text-white font-bold text-lg">{news?.title}</h5>
                                <p className="text-gray-300 text-sm mt-1">{news?.article?.substring(0,40)}...</p>
                            </div>
                            <div className='flex text-gray-300 mt-5 text-xl items-center gap-x-3'>
                                <button><FiTrash/></button>
                                <button><FiEdit3/></button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
             </section>
            </div>
            <Footer/>
        </div>
    )
}

export default HomeAdmin;