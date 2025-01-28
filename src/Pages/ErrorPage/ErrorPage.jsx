import { Link } from "react-router-dom";

import errImg from '../../assets/sad image logo.jpg'
const ErrorPage = () => {
    return (
        <div>
        <img src={errImg} alt="" className='w-64 mx-auto' />
        <p className='text-center text-xl font-semibold'>Opps! something went wrong</p>
         <div className='text-center mt-3'>
           <button className='border border-black btn btn-neutral'><Link to={'/'}>Go Back</Link></button>
         </div>
    </div>
    );
};

export default ErrorPage;