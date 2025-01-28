import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Dashboard from "../Layout/Dashboard";
import AddPet from "../Pages/Dashboard/AddPet";
import AllPets from "../Pages/AllPets/AllPets";
import PetDetails from "../Pages/PetDetails/PetDetails";
import MyAddedPets from "../Pages/MyAddedPets/MyAddedPets";
import UpdatePet from "../Pages/UpdatePet/UpdatePet";
import CreateCampaign from "../Pages/CreateCampaign/CreateCampaign";
import MyCampaigns from "../Pages/MyCampaigns/MyCampaigns";
import UpdateCampaign from "../Pages/UpdateCampaign/UpdateCampaign";
import AllCampaigns from "../Pages/AllCampaigns/AllCampaigns";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import MyDonation from "../Pages/MyDonation/MyDonation";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../Pages/UserHome/UserHome";
import AdminHome from "../Pages/AdminHome/AdminHome";
import AllPet from "../Pages/AllPetForAdmin/AllPet";
import AllDonation from "../Pages/AllDonationForAdmin/AllDonation";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/allPets',
                element: <AllPets></AllPets>
            },
            {
                path: '/petDetails/:id',
                element: <PrivateRoute><PetDetails></PetDetails></PrivateRoute>
            },
            {
                path: '/allCampaigns',
                element: <AllCampaigns></AllCampaigns>
            },
            {
                path: '/donationDetails/:id',
                element: <DonationDetails></DonationDetails>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            }, 
             {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'addPet',
                element: <AddPet></AddPet>
            },
            {
                path: 'myAddedPets',
                element: <MyAddedPets></MyAddedPets>
            },
            {
                path: 'updatePet/:id',
                element: <UpdatePet></UpdatePet>
            },
            {
                path: 'createCampaign',
                element: <CreateCampaign></CreateCampaign>
            },
            {
                path: 'myCampaigns',
                element: <MyCampaigns></MyCampaigns>
            },
            {
                path: 'updateCampaign/:id',
                element: <UpdateCampaign></UpdateCampaign>
            },
            {
                path: 'myDonation',
                element: <MyDonation></MyDonation>
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
              path: 'allPet',
              element: <AllPet></AllPet>
            },
            {
                path: 'allDonation',
                element: <AllDonation></AllDonation>
            }
           
        ]
    }
]);

export default routes;