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
                element: <PetDetails></PetDetails>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
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
            }
        ]
    }
]);

export default routes;