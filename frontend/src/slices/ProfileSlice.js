import { createSlice,createAsyncThunk
 } from "@reduxjs/toolkit";
 import { openAlert } from "./AlertSlice";
 import axios from "axios";
 
 const token = sessionStorage.getItem('token') || null;

 const API = axios.create({
    baseURL:`http://127.0.0.1:8000/api/profile`
 });


 API.interceptors.request.use((req) => {
    if(token) {
        req.headers.Authorization = `bearer ${token}`;
    }

    return req;
 }); 

 export const updateProfileSlice = createAsyncThunk('profile/update' , async ({ profile , id,setProfile,dispatch }) => {
     dispatch(
        openAlert({
            message:'Updating profile...',
            variant:'bg-blue-50',
            textVariant:'text-blue-500',
        })
     );
      try {
        const { data } = await API.put(`/update/${id}`,profile);
        setProfile(data);
        dispatch(
          openAlert({
              message:'Success profile...',
              variant:'bg-green-50',
              textVariant:'text-green-500',
          })
       );
      } catch(err) {
        return null;
      }
 });

 export const updateAvatar = createAsyncThunk('profile/avatar-update' , async ({ id,imagePend }) => {
     const formData = new FormData();

     formData.append('avatar' , imagePend);

      try { 
        const { data } = await API.put(`/update/profile/${id}`, formData);
      } catch(err) {
        return null;
      }
 });

 const ProfileSlice = createSlice({
    name:'profile',
    initialState:{
        loading:false
    },
    extraReducers:(builder)=>{ 
      builder.addCase(updateProfileSlice.fulfilled,(state,{ payload }) => {
        return state;
      })
    }
 });

 export default ProfileSlice.reducer;