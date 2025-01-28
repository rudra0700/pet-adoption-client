import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://pet-adoption-server-kappa.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;