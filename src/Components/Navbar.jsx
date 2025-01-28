import { Link, useNavigate } from 'react-router-dom';
import petlogo from '/public/pet logo.jpg'
import { RiLogoutBoxLine } from "react-icons/ri";
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAdmin from '../Hooks/useAdmin';

const Navbar = () => {
  const {user, logoutUser} = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate()
   
  const handleLogout = () => {
      logoutUser()
      .then(() => {
          toast.success("Logout Successfully")
          navigate('/login')
      })
  }
    return (
        <div>
             <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-3">
          <Link className='font-semibold'><li>Home</li></Link>
        <Link className='font-semibold' to={'/allPets'}><li>All Pets</li></Link>
        <Link className='font-semibold' to={'/allCampaigns'}><li>Campaigns</li></Link>
      </ul>
    </div>
     <div className='flex gap-0'>
        <img className='w-20' src={petlogo} alt="" />
        <a className="btn btn-ghost text-xl">PetHouse</a>
     </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-4 font-semibold text-lg">
       <Link><li>Home</li></Link>
       <Link to={'/allPets'}><li>All Pets</li></Link>
       <Link to={'/allCampaigns'}><li>Campaigns</li></Link>
    </ul>
  </div>
  <div className="navbar-end">
      {/* image */}
        {!user && <Link to={'/login'} className='mr-3 font-semibold text-lg'>Login</Link>}
         {user &&   <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
             title={user?.displayName}
            alt="user image"
            src={user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-3 font-semibold">
           
          {
            user && isAdmin &&  <Link to={'/dashboard/adminHome'}><li>Dashboard</li></Link>
          } 
            {
            user && !isAdmin &&  <Link to={'/dashboard/userHome'}><li>Dashboard</li></Link>
          }
         {/* <Link to={'/dashboard'}><li>Dashboard</li></Link> */}
        
         <Link onClick={handleLogout} className='flex items-center space-x-2'><li>Logout</li><RiLogoutBoxLine /></Link>
      </ul>
    </div>}
    
  </div>
</div>
        </div>
    );
};

export default Navbar;