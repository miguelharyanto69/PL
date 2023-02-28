import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAlert } from "../slices/AlertSlice";

const Alert = () => {
  const dispatch = useDispatch();
   const {
      variant,
      message,
      textVariant,
      open
   } = useSelector(state=>state.alert);

   useEffect(()=>{ 
    setTimeout(() => {
        dispatch(closeAlert());
    } , 6500)
   },[])

    return (
        <div className={`w-full ${variant} flex items-center justify-between py-2 px-3 rounded-md mb-4`}>
            <h5 className={`${textVariant} font-bold text-sm`}>{message}</h5>
            <button className={`font-bold ${textVariant}`}>x</button>
        </div>
    )
}

export default Alert;