import { Link } from 'react-router-dom';
import petlogo from '../../public/pet logo.jpg'
import { RiLogoutBoxLine } from "react-icons/ri";

const Navbar = () => {
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
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
       <Link><li>All Pets</li></Link>
       <Link><li>Campaigns</li></Link>
    </ul>
  </div>
  <div className="navbar-end">
      {/* image */}
        <Link className='mr-3 font-semibold text-lg'>Login</Link>
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-3 font-semibold">
         <Link><li>Dashboard</li></Link>
         <Link className='flex items-center space-x-2'><li>Logout</li><RiLogoutBoxLine /></Link>
      </ul>
    </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;