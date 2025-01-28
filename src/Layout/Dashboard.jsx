import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
     const [isAdmin, isLoading] = useAdmin();
     if(isLoading) return <p>Loading...</p>
    return (
        <>
          {/* navbar */}
          <div className="navbar bg-base-100 block md:hidden">
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2">
                     <li className=""><NavLink to={'/dashboard/adminHome'}>Admin Home</NavLink></li>
                    <li><NavLink to={'/dashboard/addPet'}>Add a Pet</NavLink></li>
                    <li><NavLink to={'/dashboard/myAddedPets'}>My Added Pets</NavLink></li>
                    <li><NavLink to={'/dashboard/createCampaign'}>Create campaigns</NavLink></li>
                    <li><NavLink to={'/dashboard/myCampaigns'}>My campaigns</NavLink></li>
                    <li><NavLink to={'/dashboard/myDonation'}>My Donations</NavLink></li>
                    <li><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>
                    <li><NavLink to={'/dashboard/allPet'}>All Pets</NavLink></li>
                    <li><NavLink to={'/dashboard/allDonation'}>All Donation</NavLink></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">PetHouse</a>
  </div>
  <div className="navbar-center hidden lg:flex">
  </div>
</div>
        <div className="flex gap-6">
             {/* dashboard sidebar */}
             <div className="w-64 min-h-screen bg-neutral border hidden md:block ">
                <ul className="menu space-y-2">
                     {
                        isAdmin ? <>
                             <li className="text-white font-semibold"><NavLink to={'/dashboard/adminHome'}>Admin Home</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/addPet'}>Add a Pet</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/myAddedPets'}>My Added Pets</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/createCampaign'}>Create campaigns</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/myCampaigns'}>All campaigns</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/myDonation'}>My Donations</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/allPet'}>All Pets</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/allDonation'}>All Donation</NavLink></li> 
                    <div className="text-white h-[1px] bg-white w-full"></div>
                    <li className="text-white font-semibold"><NavLink to={'/'}>Home</NavLink></li>
                        </>
                         :
                         <>
                               <li className="text-white font-semibold"><NavLink to={'/dashboard/userHome'}>User Home</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/addPet'}>Add a Pet</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/myAddedPets'}>My Added Pets</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/createCampaign'}>Create campaigns</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/myCampaigns'}>My campaigns</NavLink></li>
                    <li className="text-white font-semibold"><NavLink to={'/dashboard/myDonation'}>My Donations</NavLink></li>
                    <div className="text-white h-[1px] bg-white w-full"></div>
                    <li className="text-white font-semibold"><NavLink to={'/'}>Home</NavLink></li>
                         </>
                     }
               
                </ul>
             </div>
             {/* dashboard content */}
             <div className="flex-1 py-10">
                 <Outlet></Outlet>
             </div>
        </div>
        </>
    );
};

export default Dashboard;