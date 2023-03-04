import { useNavigate,Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAllNews, getAllSpotlight } from "../../slices/AdminSlice";


const MainAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(state=>state);

    useEffect(() => {
        if(!auth?.user?.isAdmin) {
           navigate("/");
        } else {
            dispatch(getAllSpotlight());
            dispatch(getAllNews());
        }
    },[auth]);

    return (
        <Outlet/>
    )
}

export default MainAdmin;