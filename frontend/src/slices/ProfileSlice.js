import { createSlice,createAsyncThunk
 } from "@reduxjs/toolkit";
 import { openAlert } from "./AlertSlice";
 import axios from "axios";
 
 const token = sessionStorage.getItem('token') || null;

 const API = axios.create({
    baseURL:`http://127.0.0.1:8000/api/profile`,

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

     console.log(profile);

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

 export const updateAvatar = createAsyncThunk('profile/avatar-update' , async ({ id,setProfile, profile,image }) => {
     const formData = new FormData();

     formData.append('avatar' , image);

      try { 
        const { data } = await API.post(`/update/avatar/${id}`, formData);
        if(data) {
           setProfile({...profile , avatar:`http://localhost:8000/storage/profile_image/${data.avatar}`});
        }
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