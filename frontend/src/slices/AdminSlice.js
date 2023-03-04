import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = sessionStorage.getItem('token') || null;

const API = axios.create({
    baseURL:`http://127.0.0.1:8000/api/admin`
});

API.interceptors.request.use((req) => {
    if(token) {
        req.headers.Authorization = `bearer ${token}`;
    }

    return req;
});

export const getAllNews = createAsyncThunk('news/all' , async () => {
     try { 
       const { data } = await API.get('/all/news');
       return data;
     } catch(err) {
        return null;
     }
});

export const getAllSpotlight = createAsyncThunk('spotlight/all' , async () => {
    try { 
        const { data } = await API.get('/all/spotlight');
        return data;
      } catch(err) {
         return null;
      }
});

export const createData = createAsyncThunk('create/data' , async ({ adminForm , id,navigate }) => {
   
    const formData = new FormData();

    formData.append('title',adminForm?.title);
    formData.append('article',adminForm.article);
    formData.append('thumbnail',adminForm.thumbnail);

    try {
        if(adminForm?.publish === "spotlight"){
           const { data } = await API.post("/create/spotlight/" + id ,formData);
           navigate("/admin");
        }
        const { data } = await API.post("/create/news/" + id ,formData);
        navigate("/admin");
        
    } catch(err) {
        return null
    }
});

const AdminSlice = createSlice({
    name:'admin',
    initialState:{
        news:[],
        spotlight:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllNews.fulfilled,(state, { payload }) => {
             if(payload) {
                 state.news = payload;

                 return state;
             }
        });
        builder.addCase(getAllSpotlight.fulfilled,(state, { payload }) => {
            if(payload) {
                state.spotlight = payload;

                return state;
            }
       });
    }
});

export default AdminSlice.reducer;