import { useSelector,useDispatch } from "react-redux";
import { Navbar,Footer } from "../../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dark from "../../assets/image/dark-bg.png";
import light from "../../assets/image/light-bg.png";
import axios from 'axios';
import avatar from '../../assets/image/avatar.jpg';

const Profile = () => {
    const navigate = useNavigate();
    const [profile,setProfile] = useState(null);
    const dispatch = useDispatch();
    const { auth } = useSelector(state=>state);

    const fetchProfile = async () => {
         try {
           const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${auth?.user?.id}`);
           setProfile(data);
         } catch(err) {
             return err;
         }
    }

    useEffect(() => {
        if(auth.token && auth.token != 'null') {
           fetchProfile();
        } else {
          navigate("/auth/login");
        }

    },[])

    return (
        <div className="w-full">
            <Navbar/>
            <section  style={{
                   backgroundImage:`url(${light})`,
                   backgroundSize:'cover',
                   backgroundPosition:'center',
                   backgroundRepeat:'no-repeat'
                }} className="w-full min-h-screen py-16 flex items-center justify-center">
                <div className="w-[60%] rounded-lg py-7 px-7 relative" style={{
                   backgroundImage:`url(${dark})`,
                   backgroundSize:'cover',
                   backgroundPosition:'center',
                   backgroundRepeat:'no-repeat'
                }}>
                    {profile?.avatar ? <img src={profile?.avatar}/> : <img src={avatar} className="w-[120px] absolute -top-12 left-[50%] -translate-x-[50%] h-[120px] rounded-full"/> }
                    <div className="flex items-center justify-center mt-16">
                    <button className="border-2 border-white text-white text-sm font-semibold rounded-full py-2 px-6">Change Profile</button>

                    </div>
                    <form className="w-full flex flex-col gap-y-4 mt-7">
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Username :</p>
                            <input value={profile?.username} className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Username"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Email :</p>
                            <input value={profile?.email} className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Email"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Birthday :</p>
                            <input className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Birthday"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Phone :</p>
                            <input className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Phone"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Description :</p>
                            <textarea className="w-[85%] py-2 px-3 h-[120px] bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Description"></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">City :</p>
                            <input className="w-[85%] py-2 px-3  bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="City"></input>
                        </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Birth date :</p>
                            <input className="w-[85%] py-2 px-3  bg-transparent text-white outline-none border border-white rounded-md" type='date' placeholder="City"></input>
                        </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Gender : </p>
                            <select className="w-[85%] py-2 px-3  bg-transparent text-white outline-none border border-white rounded-md" type='date' >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mt-7 flex justify-center items-center gap-x-3">
                            <button className="bg-orange-500 text-white border-2 border-orange-500 text-md font-semibold rounded-full py-2 px-6">Save</button>
                            <button className="border-2 border-white text-white text-md font-semibold rounded-full py-2 px-6">Cancel</button>

                            </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Profile;