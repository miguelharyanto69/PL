import { useSelector,useDispatch } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(state=>state);

    return (
        <div className="w-full"></div>
    )
}

export default Profile;