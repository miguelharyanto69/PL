import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import auth from "../../assets/image/auth.png";
import { LoginHandler } from "../../slices/AuthSlice";
import { Alert } from "../../components";

const Login = () => {
    const navigate = useNavigate();
    const { token } = useSelector(state=>state.auth);
    const { open } = useSelector(state=>state.alert);
    const dispatch = useDispatch();
    const [loginForm,setLoginForm] = useState({
         email:"",
         password:""
    });

    useEffect(()=> {
        document.title = "Login";

        if(token && token != 'null') {
            navigate("/");
        }
    },[token]);

    const changeHandler = (e) => setLoginForm({...loginForm, [e.target.name]:e.target.value});
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(LoginHandler({ loginForm,dispatch}));
    }

    return (
        <div style={{
            backgroundImage:`url(${auth})`,
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center"
        }} className="w-full h-screen flex items-center justify-center">
            <section className="bg-white rounded-lg py-5 px-5">
                {open ? <Alert/> : null}
                <h3 className="text-center font-bold text-2xl uppercase">sign in</h3>
                <form  onSubmit={submitHandler} className="mt-5 flex flex-col gap-y-3">
                    <input placeholder="Email" type="email" onChange={changeHandler} name="email" className="border-b outline-none border-gray-300 pb-3 w-[450px]" value={loginForm?.email}/>
                    <input placeholder="Password" type="password" onChange={changeHandler} name="password" className="border-b outline-none border-gray-300 pb-3 w-[450px]" value={loginForm?.password}/>
                    <button className="mt-5 rounded-full text-md font-semibold text-white py-2 bg-orange-400">Sign In</button>
                </form>
                <p className="text-gray-500 text-sm text-center mt-3">Don't have account? <Link className="text-orange-400 font-bold" to="/register">Register</Link></p>
            </section>
        </div>
    )
}

export default Login;