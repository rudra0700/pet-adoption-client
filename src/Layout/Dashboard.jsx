import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex gap-6">
             {/* dashboard sidebar */}
             <div className="w-64 min-h-screen bg-orange-300 border">
                <ul className="menu space-y-2">
                    <li className="bg-blue-500"><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/dashboard/addPet'}>Add a Pet</NavLink></li>
                    <li><NavLink to={'/dashboard/myAddedPets'}>My Added Pets</NavLink></li>
                    <li><NavLink to={'/dashboard/createCampaign'}>Create campaigns</NavLink></li>
                    <li><NavLink>My campaigns</NavLink></li>
                </ul>
             </div>
             {/* dashboard content */}
             <div className="flex-1 py-10">
                 <Outlet></Outlet>
             </div>
        </div>
    );
};

export default Dashboard;