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
           const request = await API.post("/create/spotlight/" + id ,formData);
           window.location.href = "/admin";
        }
        const request = await API.post("/create/news/" + id ,formData);
        window.location.href = "/admin";        
    } catch(err) {
        return null
    }
});

export const updateData = createAsyncThunk('update/data' , async ({ adminForm , id }) => {
    const formData = new FormData();

    formData.append('title',adminForm?.title);
    formData.append('article',adminForm.article);
    formData.append('thumbnail',adminForm.thumbnail);

    if(adminForm.publish === "spotlight") {
         const { data } = await API.post("/update/spotlight/" + id, formData);
         window.location.href = "/admin";
    }else {
        const { data } = await API.post("/update/news/" + id ,formData);
         window.location.href = "/admin";
    }
});

export const deleteNews = createAsyncThunk('news/delete' , async (id) => {
       await API.delete('/delete/news/' + id);
       return id;
});

export const deleteSpotlight = createAsyncThunk('spotlight/delete' , async (id) => {
       await API.delete('/delete/spotlight/' + id);
       return id;
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

       builder.addCase(deleteNews.fulfilled,(state, { payload }) => {
            const filtered = state.news.filter((news)=>news.id !== payload ? news : "");

            console.log(filtered);

            state.news = filtered;

            return state;
       });

       builder.addCase(deleteSpotlight.fulfilled,(state, { payload }) => {
        const filtered = state.spotlight.filter((spotlight)=>spotlight.id !== payload ? spotlight : "");

        state.spotlight = filtered;

        return state;
   });
    }
});

export default AdminSlice.reducer;