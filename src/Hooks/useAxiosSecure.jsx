import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
   baseURL: "https://pet-adoption-server-kappa.vercel.app"
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logoutUser} = useAuth()
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem("access-token");
        // console.log("req stopped by interceptor", token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function(error){
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function(response){
        return response
    }, async (error) => {
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logoutUser()
        //    navigate('/login')
        }
        // console.log("error caught in interceptors", status);
      return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;