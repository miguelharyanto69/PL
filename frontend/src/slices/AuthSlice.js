import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import decode from "jwt-decode";
import axios from 'axios';
import { openAlert } from "./AlertSlice";

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_URL}/auth`
});

const user = sessionStorage.getItem("token") || null;

export const LoginHandler = createAsyncThunk('auth/login' , async ({ loginForm,dispatch }) => {
  
    dispatch(openAlert({
         open:true,
         message:"Authenticated user",
         variant:"bg-blue-50",
         textVariant:"text-blue-500"
    }));

       try {
          const { data } = await API.post(`/login` , loginForm);
 
          if(data){
              return data;
          }
       } catch(err) {
        dispatch(openAlert({
            open:true,
            message:err.response.data.message,
            variant:"bg-red-50",
            textVariant:"text-red-500"
       }));
          return null;
       }
});

export const RegisterHandler = createAsyncThunk('auth/register' , async ({ registerForm,dispatch,navigate }) => {
    dispatch(openAlert({
        open:true,
        message:"Creating user",
        variant:"bg-blue-50",
        textVariant:"text-blue-500"
   }));

    try{
      const { data } = await API.post("/register" , registerForm);

      if(data) {
        return navigate("/");
      }
    } catch(err) {
        return null;
    }
});

const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        user:user != null ? decode(user) : null,
        token:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(LoginHandler.fulfilled,(state, { payload }) => {
             if(payload){
                 state.token = payload.token;
                 state.user = decode(payload.token);
                 
                 return state;
             }
        });
    }
});

export default AuthSlice.reducer;