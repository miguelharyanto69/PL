import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const checkoutHandler = createAsyncThunk('ticket/checkout' , async () => {
    try {

    } catch(err) {
        return null;
    }
});

const TicketSlices = createSlice({
    name:'ticket',
    initialState: {
         tickets:[],
         loading:false 
    },
    extraReducers:(builder) => {
       builder.addCase(checkoutHandler.fulfilled,(state, { payload }) => {

       });
    }
});

export default TicketSlices.reducer;