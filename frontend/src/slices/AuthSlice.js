import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import decode from "jwt-decode";
import axios from 'axios';
import { closeAlert, openAlert } from "./AlertSlice";

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
        dispatch(openAlert({
             message:"Success create account",
             variant:"bg-green-50",
             textVariant:"text-green-500",
             open:true
        }));
        return navigate("/");
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

const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        user:user !== null && user !== 'null'  ? decode(user) : null,
        token:user,
    },
    reducers:{
         logoutHandler(state){
             state.token = null;
             state.user = null;

             sessionStorage.setItem('token' , JSON.stringify(state.token));

             return state;
         }
    },
    extraReducers:(builder)=>{
        builder.addCase(LoginHandler.fulfilled,(state, { payload }) => {
             if(payload){
                 state.token = payload.access_token;
                 state.user = decode(payload.access_token);
                 
                 sessionStorage.setItem("token" , JSON.stringify(state.token));
                 return state;
             }
        });
    }
});

export const { logoutHandler } = AuthSlice.actions;

export default AuthSlice.reducer;