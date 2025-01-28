
import registerLottie from '../../public/register.json'
import googleLogo from '/public/google login logo.png'
import { Helmet } from 'react-helmet';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Register = () => {
     const {createUser, updateProfileUser, googleSignIn} = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = {image: data.image[0]}
         try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            console.log(res.data);
            const userInfo = {
                name: data?.name,
                email: data?.email,
                userImg: res.data?.data?.display_url
            }
            await createUser(data.email, data.password);
            await updateProfileUser(data.name, res.data?.data?.display_url);
            const userRes = await axiosPublic.post('/users', userInfo);
            navigate('/')
            toast.success("Registered successfully")
         } catch (error) {
            console.log(error);
         }
    };
    

    const handleGoogleSignIn =  () => {
       googleSignIn()
       .then(res => {
           const userInfo = {
              name: res.user?.displayName,
              email: res.user?.email
           }
           axiosPublic.post('/users', userInfo)
           .then(() => {
                toast.success("SignIn successfully");
                navigate('/')
           })
            .catch(error => {
                toast.error(error.response.data.message);
            })
       })
    }

    return (
      <div className='hero min-h-screen'>
           <Helmet>                     
              <title>PetHouse | Register</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left hidden md:block w-[500px]">
                    <Lottie animationData={registerLottie}></Lottie>
                </div>
                <div className="card bg-base-100 w-full lg:max-w-sm shrink-0 shadow-2xl">
                    <div onClick={handleGoogleSignIn} className='flex items-center gap-8 mt-2 md:gap-24 lg:gap-14  border border-gray-200 p-1 rounded-md mr-8 ml-8'>
                            <img src={googleLogo} className='w-10' alt="google logo" />
                            <p className='font-medium text-gray-600'>Sign in with Google</p>
                    </div>
                    <div className="divider text-xs w-80 mx-auto mb-0">OR REGISTRATION WITH EMAIL</div>
                    <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-semibold text-gray-600">Username</span>
                            </label>
                            <input type="text" name='name' {...register("name", { required: true })} className="input input-bordered focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-semibold text-gray-600">Photo URL</span>
                            </label>
                            <input  type="file" {...register("image", { required: true })} className="input" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-semibold text-gray-600">Email Address</span>
                            </label>
                            <input type="email" name='email' {...register("email", { required: true })} className="input input-bordered focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-semibold text-gray-600">Password</span>
                            </label>
                            <input type="password" name='password' {...register("password", {
                                required: true,
                                maxLength: 20,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                            })} 
                             className="input input-bordered focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" required />
                               {errors.password?.type === "required" && (
                                <span className="text-red-600 mt-1">This field is required</span>
                                )}
                                {errors.password?.type === "minLength" && (
                                <span className="text-red-600 mt-1">
                                    Password must contain at least 6 characters
                                </span>
                                )}
                                {errors.password?.type === "maxLength" && (
                                <span className="text-red-600 mt-1">
                                    Password length must be less than 20 characters.
                                </span>
                                )}
                                {errors.password?.type === "pattern" && (
                                <span className="text-red-600 mt-1">
                                    Password must contain at least one uppercase, one lowercase, one
                                    number and one special character
                                </span>
                                )}
                                
                            <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-neutral text-white">Sign Up</button>
                        </div>
                    </form>
                    <div className="divider text-xs w-80 mx-auto mt-0"><Link to={'/login'}>OR SIGN IN</Link></div>
                </div>
            </div>
      </div>
    );
};

export default Register;