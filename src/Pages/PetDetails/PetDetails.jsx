import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {add, format} from 'date-fns'
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";


const PetDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth() ;
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState();
    const navigate = useNavigate();
  

     const {data: pet = {}, isLoading} = useQuery({
        queryKey: ["pet"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/petDetails/${id}`);
            return res.data
        }
     })

     const {category, deadline, image, longDesc, ownerImg, ownerEmail, ownerLocation, ownerName, petAge, petName, _id} = pet || {};


      if(isLoading) return <p>Loading</p>
     console.log(pet);
        const adoptInfo = {
            userEmail: user?.email,
            userName: user?.displayName,
            petId: _id,
            phone: phone,
            address: address,
            ownerEmail: ownerEmail,
            petName: petName, 
            petAge: petAge,
            category: category,
            image: image,
        }

     const handleAdoption = async () => {
        try {
            // save adoption req in db
            await axiosSecure.post('/adopt', adoptInfo);
            navigate('/allPets');
            toast.success("Adopted successfully")
        } catch (error) {
           console.log(error); 
        }
     }

    return (
        <div className="max-w-6xl mx-auto my-8">
             <div className="card lg:card-side bg-base-100 shadow-xl flex">
                <figure className="w-[40%]">
                    <img
                    className="w-96 h-96 object-cover"
                    src={image}
                    alt="Album" />
                </figure>
                <div className="ml-4 mt-4 w-[60%] space-y-1">
                    <h2 className="card-title uppercase">{petName}</h2>
                      <p className="opacity-70 font-semibold">Category: {category}</p>
                      <p className="opacity-70 font-semibold">Publish Date: {format(new Date(deadline), "P")}</p>
                      <p className="opacity-70 font-semibold">Age: {petAge}</p>
                       <div className="flex items-center justify-between">
                          <p className="opacity-70 font-semibold">Owner: {ownerName}</p>
                       </div>
                      <p className="opacity-70 font-semibold">Owner Location: {ownerLocation}</p>
                       <p className="opacity-70 font-semibold">{longDesc}</p>
                    <div className="mt-3">
                        <button className="btn btn-neutral mt-2" onClick={()=>document.getElementById('my_modal_1').showModal()}>Want to Adopt</button>
                         {/* modal */}
                        <dialog id="my_modal_1" className="modal">
                        <div className="modal-box text-center">
                             {/* avatar */}
                             <div className="mx-auto">

                             <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img className="mx-auto" src={image} />
                                </div>
                            </div>
                             </div>
                            <h3 className="font-bold text-lg uppercase">{petName}</h3>
                            <p className="opacity-70 font-semibold">Category: {category}</p>
                            <p className="opacity-70 font-semibold">Your Email: {user?.email}</p>
                             <div className="mt-2">
                                <span className="label-text opacity-70 font-semibold">Address: </span> <input type="text" onChange={(e) => setAddress(e.target.value)} className="border-2 rounded-md p-1 outline-none" required />  
                             </div>
                             <div className="mt-2">
                               <span className="label-text opacity-70 font-semibold">Phone: </span> <input type="text" onChange={(e) => setPhone(e.target.value)} placeholder="xxxxxxxx" className=" ml-3 border-2 rounded-md p-1 outline-none" required />
                             </div>
                        
                
                            <div className="flex w-[50%] mx-auto justify-between mt-5">
                                 <button onClick={handleAdoption} className="btn text-center">Adopt</button>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;