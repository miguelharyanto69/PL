import { Outlet } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllNews, getAllSpotlight } from "../../slices/AdminSlice";

const MainHome = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { auth } = useSelector(state=>state);

   useEffect(() => {
      if(!auth?.token || auth?.token == 'null') {
          navigate("/auth/login");
      }else {
          dispatch(getAllSpotlight());
          dispatch(getAllNews());
      }
   },[auth]);

    return (
        <Outlet/>
    )
}

export default MainHome;