import { Link , useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "../../assets/image/auth.png";
import { useSelector,useDispatch } from "react-redux";
import { RegisterHandler } from "../../slices/AuthSlice";
import { Alert } from "../../components";

const Register = () => {
    const navigate = useNavigate();
    const { token } = useSelector(state=>state.auth);
    const { open } = useSelector(state=>state.alert);
    const dispatch = useDispatch();
    const [registerForm,setRegisterForm] = useState({
        username:"",
        email:"",
        password:"",
        confirm:""
    });

    useEffect(() => {
        document.title = "Register";
         
        if(token && token != 'null') {
            return navigate("/");
        }

    },[token]);

    const changeHandler = (e) => setRegisterForm({...registerForm, [e.target.name]:e.target.value});

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(RegisterHandler({ registerForm,dispatch , navigate }));
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
                <h3 className="text-center font-bold text-2xl uppercase">sign up</h3>
                <form onSubmit={submitHandler} className="mt-5 flex flex-col gap-y-3">
                <input placeholder="Username" type="text" onChange={changeHandler} name="username" className="border-b outline-none border-gray-300 pb-3 w-[450px]" value={registerForm?.username}/>
                    <input placeholder="Email" type="email" onChange={changeHandler} name="email" className="border-b outline-none border-gray-300 pb-3 w-[450px]" value={registerForm?.email}/>
                    <input placeholder="Password" type="password" onChange={changeHandler} name="password" className="border-b outline-none border-gray-300 pb-3 w-[450px]" value={registerForm?.password}/>
                    <input placeholder="Confirm Password" type="password" onChange={changeHandler} name="confirm" className="border-b outline-none border-gray-300 pb-3 w-[450px]" value={registerForm?.confirm}/>
                    <button className="mt-5 rounded-full text-md font-semibold text-white py-2 bg-orange-400">Sign Up</button>

                </form>
                <p className="text-gray-500 text-sm text-center mt-3">Already have account? <Link className="text-orange-400 font-bold" to="/">Login</Link></p>
            </section>
        </div>
    )
}

export default Register;