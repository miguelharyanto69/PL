import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
    name:'alert',
    initialState:{
        message:"",
        variant:"",
        textVariant:"",
        open:false 
    },
    reducers:{
        openAlert(state,{ payload }) {
            state.open = true;
            state.message = payload.message;
            state.variant = payload.variant;
            state.textVariant = payload.textVariant;
            
            return state;
        },
        closeAlert(state, { payload }) {
            state.open = false;
            state.message = "";
            state.variant = "";
            state.textVariant = "";

            return state;
        }
    }
});

export const { openAlert,closeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;