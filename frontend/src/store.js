import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import AlertSlice from "./slices/AlertSlice";

export default configureStore({
    reducer:{
        auth:AuthSlice,
        alert:AlertSlice
    }
});