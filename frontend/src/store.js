import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import AlertSlice from "./slices/AlertSlice";
import AdminSlice from "./slices/AdminSlice";

export default configureStore({
    reducer:{
        auth:AuthSlice,
        alert:AlertSlice,
        admin:AdminSlice
    }
});