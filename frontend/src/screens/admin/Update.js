import { Navbar,Footer } from '../../components'
import React , { useState ,useEffect } from 'react';
import light from '../../assets/image/light-bg.png';
import dark from "../../assets/image/dark-bg.png";
import { MdOutlineImage } from 'react-icons/md';
import { useSelector,useDispatch } from 'react-redux';
import { updateData } from "../../slices/AdminSlice";
import { useNavigate,useParams,useLocation } from 'react-router-dom';

const Update = () => {
 const { id } = useParams();
 const location = useLocation();
 const dispatch = useDispatch();
 const { auth,admin } = useSelector(state=>state);
 const [adminForm,setAdminForm] = useState({
     title:"",
     publish:"",
     article:"",
     thubmnail:null 
 });

 const changeHandler = (e) => setAdminForm({...adminForm , [e.target.name]:e.target.value});

 const imageHandler = (element) => {
    const file = element.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        setAdminForm({...adminForm ,thumbnail:file});
    }

    reader.readAsDataURL(file);
  }


 const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateData({ adminForm , id }));
 }

 useEffect(() => {
    if(location.pathname.includes("spotlight")) {
         const find_spotlight = admin.spotlight.find(item=>item.id == id);
         setAdminForm({
           title:find_spotlight?.title,
           article:find_spotlight?.article
         });
    } else {
        const find_news = admin.news.find(item=>item.id == id);
        setAdminForm({
          title:find_news?.title,
          article:find_news?.article
        });
    }
 },[id]);

  return (
    <div style={{
        backgroundImage:`url(${light})`,
        backgroundSize:'cover',
        backgroundPosition:'center'
    }} className='w-full min-h-screen flex flex-col justify-between'>
        <Navbar/>
        <section className='w-[60%] my-7 rounded-lg py-5 px-7 mx-auto' style={{
             backgroundImage:`url(${dark})`,
             backgroundSize:'cover',
             backgroundPosition:'center'
        }}>
            <h2 className='text-xl font-bold uppercase text-center text-white'>Upload news or spotlight</h2>

            <form onSubmit={submitHandler} className='w-full mt-10 flex flex-col gap-y-4'>
                <div className='flex items-start justify-between'>
                    <h5 className='text-white text-md font-medium'>Thumbnail</h5>
                    <input onChange={imageHandler} type="file" className='hidden' name='thumbnail' id='thumbnail'/>
                    <label for="thumbnail" className='w-[80%] flex justify-center items-center border-dashed border-2 border-white h-[250px]'>
                        <span className='cursor-pointer text-xl font-semibold flex flex-col justify-center items-center text-white'>
                            <MdOutlineImage className='text-[70px] mb-2'/>
                            Upload Image
                        </span>
                    </label>
                </div>
                <div className='flex items-start justify-between'>
                    <h5 className='text-white text-md font-medium'>Title</h5>
                    <input onChange={changeHandler} value={adminForm?.title} type="text" name="title" className='w-[80%] text-white py-2 px-3 rounded-md bg-transparent border border-white'/>
                </div>
                <div className='flex items-start justify-between'>
                    <h5 className='text-white text-md font-medium'>Article</h5>
                    <textarea onChange={changeHandler} value={adminForm?.article} type="text" name="article" className='w-[80%] text-white py-2 px-3 rounded-md bg-transparent border border-white h-[150px]'></textarea>
                </div>
                <div className='flex items-center'>
                <h5 className='text-white text-md font-medium'>Publish as</h5>
                <div className='flex items-center ml-24 gap-x-5'>
                     <div className="flex text-white gap-x-2 items-center">
                        <input onChange={changeHandler} id="news" type="radio" value="news" name="publish"/>
                        <label>News</label>
                     </div>
                     <div className="flex text-white gap-x-2 items-center">
                        <input onChange={changeHandler} id="spotlight" value="spotlight" type="radio" name="publish"/>
                        <label>Spotlight</label>
                     </div>
                </div>
                </div>
                <div className='flex justify-center items-center mt-7 gap-x-5'>
                <button type='submit' className="bg-orange-500 text-white border-2 border-orange-500 text-md font-semibold rounded-full py-2 px-6">Update</button>
                <button type='button' className="border-2 border-white text-white text-md font-semibold rounded-full py-2 px-6">Cancel</button>
                </div>
            </form>
        </section>
        <Footer/>
    </div>
  )
}

export default Update;