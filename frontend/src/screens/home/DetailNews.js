import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Navbar,Footer } from "../../components";
import light from "../../assets/image/light-bg.png";
import dark from "../../assets/image/dark-bg.png";
import axios from 'axios';

const DetailNews = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [detail,setDetail] = useState(null);

  useEffect(() => {
    if(pathname.includes("spotlight")) {
        axios.get(`http://127.0.0.1:8000/api/admin/detail/${id}?page=spotlight`)
        .then(res=>setDetail({...res.data, page:"spotlight"}));
    }else {
        axios.get(`http://127.0.0.1:8000/api/admin/detail/${id}?page=news`)
        .then(res=>setDetail({...res.data, page:"news"}));
    }
  },[id,pathname])

  return (
    <div
    className="w-full min-h-screen" style={{
        backgroundImage:`url(${light})`,
        backgroundSize:'cover',
        backgroundPosition:'center'
    }}
    >
        <Navbar/>
        <section className='w-full'>
            <div className='w-[55%] text-white py-10 mx-auto text-center'>
                <h1 className='font-bold text-3xl text-white'>{detail?.title}</h1>
                <p className='my-2'>Author : {detail?.user?.username}</p>
                <p >{new Date(detail?.created_at).toDateString()}</p>
                <img src={`http://127.0.0.1:8000/storage/${detail?.page === "spotlight" ? "spotlight_image/" : "news_image/"}/${detail?.thumbnail}`} className="w-full rounded-lg my-5 h-[350px]"/>
                <p>{detail?.article}</p>
            </div>
        </section>
        <Footer/>
    </div>
  )
}

export default DetailNews