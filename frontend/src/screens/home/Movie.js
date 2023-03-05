import { useLocation, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import light from "../../assets/image/light-bg.png";
import dark from "../../assets/image/dark-bg.png";
import { Navbar,Footer } from '../../components';
import { fetchMovie } from '../../api';

const Movie = () => {
   const { id } = useParams();
   const [movie,setMovie] = useState(null);

   useEffect(() => {

      document.title = `Movie | ${movie?.id}`;

       fetchMovie(id ,setMovie);
   } ,[id]);
 
   return (
     <div style={{
        backgroundImage:`url(${light})`,
        backgroundSize:'cover',
        backgroundPosition:'center'
     }} className='w-full min-h-screen'>
        <Navbar/>
        <section className='w-full flex justify-center items-center my-10'>
           <div className='w-[50%] mx-auto py-7 px-7 rounded-lg' style={{
            backgroundImage:`url(${dark})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
           }}>
              <div className='flex items-start gap-x-5'>
                  <img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} className="w-[240px] rounded-md"/>
                  <div className='flex-1 flex flex-col gap-y-3'>
                    <h5 className='text-white font-bold uppercase text-lg text-center'>{movie?.title}</h5>
                    <div className='text-gray-400 mt-5 flex justify-between items-center'>
                        <p>Genre</p>
                        <p>Action,Horror,Data</p>
                    </div>
                    <div className='text-gray-400 flex justify-between items-center'>
                        <p>Duration</p>
                        <p>{movie?.runtime} Minutes</p>
                    </div>
                    <div className='text-gray-400 flex justify-between items-center'>
                        <p>Relase Date</p>
                        <p>{movie?.release_date}</p>
                    </div>
                    <div className='text-gray-400 flex justify-between text-right items-center'>
                        <p>Language</p>
                         <div className='flex flex-wrap items-center gap-x-2'>
                            {movie?.spoken_languages?.slice(0,2)?.map((language,idx) => (
                                <p>{language.english_name},</p>
                            ))}
                         </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-bold text-white uppercase'>ayani xxi</h3>
                    <p className='text-md text-gray-300 font-semibold'>Rp 70.000</p>
                </div>
                <div className='flex items-center mt-4 gap-x-3'>
                    <button className='border border-white text-white rounded-full py-2 px-5'>13:00 PM</button>
                    <button className='border border-white text-white rounded-full py-2 px-5'>15:00 PM</button>
                    <button className='border border-white text-white rounded-full py-2 px-5'>17:00 PM</button>
                    <button className='border border-white text-white rounded-full py-2 px-5'>20:00 PM</button>

                </div>
                </div>
                <div className='border-t border-white mt-5 pt-5'>
                    <h2 className='text-xl text-white uppercase font-bold'>synopsis</h2>
                    <p className='text-gray-300 mt-3 leading-5 text-sm'>{movie?.overview}</p>
                </div>
           </div>
        </section>
        <Footer/>
     </div>
   )
}

export default Movie;