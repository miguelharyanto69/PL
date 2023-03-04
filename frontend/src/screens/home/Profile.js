import { useSelector,useDispatch } from "react-redux";
import { Navbar,Footer } from "../../components";
import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import dark from "../../assets/image/dark-bg.png";
import light from "../../assets/image/light-bg.png";
import axios from 'axios';
import avatar from '../../assets/image/avatar.jpg';
import { updateProfileSlice,updateAvatar } from "../../slices/ProfileSlice";
import { Alert } from "../../components";

const mimeType = ['jpg', 'png','jpeg'];

const Profile = () => {
    const navigate = useNavigate();
    const avatarRef = useRef();
    const [profile,setProfile] = useState(null);
    const dispatch = useDispatch();
    const { auth , alert } = useSelector(state=>state);
    

    const fetchProfile = async () => {
         try {
           const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${auth?.user?.id}`);
           setProfile(data);
         } catch(err) {
             return err;
         }
    }

    useEffect(() => {

        document.title = `Profile | ${auth?.user?.username}`;

        if(auth.token && auth.token != 'null') {
           fetchProfile(setProfile);
        } else {
          navigate("/auth/login");
        }

    },[]);

    const updateProfileFn = (e) => {
       e.preventDefault();
       dispatch(updateProfileSlice({ setProfile, profile,id:auth?.user?.id,dispatch }));
    }
    
    const imageHandler = (element) => {
        const file = element.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
           
            setProfile({...profile ,avatar:reader.result});
            dispatch(updateAvatar({ setProfile, profile , id:auth?.user?.id,image:file }));
        }

        console.log("test");
        reader.readAsDataURL(file);
      }

    const changeHandler = (e) => setProfile({...profile,[e.target.name]:e.target.value});
  
    return (
        <div className="w-full">
            <Navbar/>
            <section  style={{
                   backgroundImage:`url(${light})`,
                   backgroundSize:'cover',
                   backgroundPosition:'center',
                   backgroundRepeat:'no-repeat'
                }} className="w-full flex-col min-h-screen py-16 flex items-center justify-center">
                <div className={`w-[60%] mx-auto ${alert.open ? "mb-14" : "mb-0"}`}>
                    {alert.open ? <Alert/> : null}
                </div>
                <div className="w-[60%] rounded-lg py-7 px-7 relative" style={{
                   backgroundImage:`url(${dark})`,
                   backgroundSize:'cover',
                   backgroundPosition:'center',
                   backgroundRepeat:'no-repeat'
                }}>
                    {profile?.avatar ? <img src={profile?.avatar.length > 40 ? profile?.avatar : `http://127.0.0.1:8000/storage/profile_image/${profile?.avatar}`} className="w-[120px] absolute -top-12 left-[50%] -translate-x-[50%] h-[120px] rounded-full"/> : <img src={avatar} className="w-[120px] absolute -top-12 left-[50%] -translate-x-[50%] h-[120px] rounded-full"/> }
                    <div className="flex items-center justify-center mt-16">
                
                    <input formEncType="multipart/form-data" onChange={imageHandler} type="file" id="avatar" name="avatar" className="hidden"/>
                    <label for="avatar">
                    <span className="cursor-pointer border-2 border-white text-white text-sm font-semibold rounded-full py-2 px-6">Change Profile</span>
                    </label>

                    </div>
                    <form onSubmit={updateProfileFn} className="w-full flex flex-col gap-y-4 mt-7">
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Username :</p>
                            <input onChange={changeHandler} name="username" value={profile?.username} className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Username"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Email :</p>
                            <input onChange={changeHandler} name="email" value={profile?.email} className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Email"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Birthday :</p>
                            <input onChange={changeHandler} name="birthday" value={profile?.birthday} className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='date' placeholder="Birthday"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Phone :</p>
                            <input onChange={changeHandler} name='phone' value={profile?.phone} className="w-[85%] py-2 px-3 bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Phone"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Description :</p>
                            <textarea onChange={changeHandler} value={profile?.description} name='description' className="w-[85%] py-2 px-3 h-[120px] bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="Description"></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">City :</p>
                            <input onChange={changeHandler} name='city' value={profile?.city} className="w-[85%] py-2 px-3  bg-transparent text-white outline-none border border-white rounded-md" type='text' placeholder="City"></input>
                        </div>
                
                          <div className="flex items-center justify-between">
                            <p className="text-white font-semibold mr-8">Gender : </p>
                            <select onChange={changeHandler} name='gender' className="w-[85%] py-2 px-3  text-white bg-transparent  outline-none border border-white rounded-md" type='date' >
                                <option className="text-black" selected={`${profile?.gender === "male" ? true : false}`} value="male">Male</option>
                                <option className="text-black" selected={`${profile?.gender === "female" ? true : false}`} value="female">Female</option>
                            </select>
                        </div>
                        <div className="mt-7 flex justify-center items-center gap-x-3">
                            <button type='submit' className="bg-orange-500 text-white border-2 border-orange-500 text-md font-semibold rounded-full py-2 px-6">Save</button>
                            <button type='button' className="border-2 border-white text-white text-md font-semibold rounded-full py-2 px-6">Cancel</button>
                            </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Profile;