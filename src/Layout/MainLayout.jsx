
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
    return (
        <div>
             <div className='container mx-auto'>
                <Navbar></Navbar>
             </div>
             <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;