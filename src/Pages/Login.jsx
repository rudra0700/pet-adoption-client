import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import loginLottie from '../../public/login.json'
import googleLogo from '/public/google login logo.png'
import { Link } from "react-router-dom";


const Login = () => {

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try {
            await loginUser(email, password);
            toast.success("Login Successful");
        } catch (error) {
            toast.error(error?.message)
        }
    }
    return (
        <div className="hero min-h-screen">
        <Helmet>
            <title>SwiftServe | Login</title>
        </Helmet>
<div className="hero-content flex-col lg:flex-row">
<div className="text-center lg:text-left hidden md:block w-[500px]">
<Lottie animationData={loginLottie}></Lottie>
</div>
<div className="card bg-base-100 w-full lg:max-w-sm shrink-0 shadow-2xl">
<img src='/public/service reg log icon.png' className='w-10 mx-auto mt-10' alt="" />
<h4 className='text-center mt-8 mb-4 text-xl text-gray-600'>Welcome back</h4>
<div  className='flex items-center gap-8 md:gap-24 lg:gap-14  border border-gray-200 p-1 rounded-md mr-8 ml-8'>
  <img src={googleLogo} className='w-10' alt="google logo" />
  <p className='font-medium text-gray-600'>Sign in with Google</p>
</div>
<div className="divider text-xs w-80 mx-auto mb-0">OR LOGIN WITH EMAIL</div>
<form className="card-body">
<div className="form-control">
<label className="label">
<span className="label-text font-semibold text-gray-600">Email Address</span>
</label>
<input type="email" name='email' className="input input-bordered focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" required />
</div> 
<div className="form-control">
<label className="label">
<span className="label-text font-semibold text-gray-600">Password</span>
</label>
<input type="password" name='password' className="input input-bordered focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" required />
</div>
<div className="form-control mt-6">
<button className="btn btn-neutral text-white">Sign In</button>
</div>
</form>
<div className="divider text-xs w-80 mx-auto mt-0"><Link to={'/register'}>OR REGISTRATION WITH EMAIL</Link></div>
</div>

</div>
</div>
    );
};

export default Login;