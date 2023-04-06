import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem('token'));
const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_URL}/ticket`
});

API.interceptors.request.use((request) => {
    if(user) {
        request.headers.Authorization = `Bearer ${user}`;
    }

    return request;
});

export const getAllTickets = createAsyncThunk('ticket/get-all-ticket' , async ({ user_id }) => {
    try {
        const { data } = await API.get('/all/' + user_id);

        if(data) {
            return data;
        }

    } catch(err) {
        return null;
    }
});

export const checkoutHandler = createAsyncThunk('ticket/checkout' , async ({ checkoutData,user_id }) => {
    try {
       const { data } = await API.post('/checkout/' + user_id , checkoutData);

       if(data) {
        return data;
       }

    } catch(err) {
        return null;
    }
});

const TicketSlices = createSlice({
    name:'ticket',
    initialState: {
         tickets:[],
         loading:false ,
         process:false
    },
    extraReducers:(builder) => {
       builder.addCase(getAllTickets.fulfilled, (state,  { payload }) => {
            if(payload) {
                state.tickets = payload;
            }

            return state;
       });

       builder.addCase(checkoutHandler.pending, (state , { payload }) => {
          state.loading = true;

          return state;
       })

       builder.addCase(checkoutHandler.fulfilled,(state, { payload }) => {
             if(payload) {
                state.process = true;
                state.loading =false;
                state.tickets = payload;
             }
             return state;
       }); 
    }
});

export default TicketSlices.reducer;