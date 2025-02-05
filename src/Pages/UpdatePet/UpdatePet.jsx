import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatePet = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const {id} = useParams();
    const navigate = useNavigate()
    const {data: pet = {}} = useQuery({
        queryKey: ["pet", id],
        queryFn : async () => {
            const res = await axiosSecure.get(`/petDetails/${id}`);
            return res.data;
        }
    })
    const {category, deadline, longDesc, petAge, petName,  shortDesc, ownerLocation} = pet;
    const [startDate, setStartDate] = useState(deadline)
       const onSubmit = async (data) => {

             const imageFile = {image: data.image[0]}
             try {
                 const res = await axiosPublic.post(image_hosting_api, imageFile, {
                     headers: {
                         'content-type': 'multipart/form-data'
                     }
                 })
              
                 const petInfo = {
                     petName: data?.name,
                     petAge: data?.age,
                     category: data?.category,
                     ownerLocation: data?.location,
                     image: res.data?.data?.display_url,
                     shortDesc: data?.shortDesc,
                     longDesc: data?.longDesc,
                     ownerEmail: user?.email,
                     ownerImg: user?.photoURL,
                     ownerName:user?.displayName,
                     deadline: startDate,
                     adopted: false
                 }
              
                 await axiosSecure.put(`/pet/${id}`, petInfo);
                 toast.success("updated pet details successfully");
                 navigate('/dashboard/myAddedPets')
             } catch (error) {
                //  console.log(error);
             }
           }
     
    return (
        <div className="px-8">
            <h3 className="text-3xl font-bold text-center">Want to Update?</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                                <div className="flex gap-4">
                                     <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Pet Name</span>
                                         </label>
                                         <input type="text" defaultValue={petName} placeholder="name" {...register('name', { required: true })}  className="input input-bordered" required/>
                                     </div>  
                                       <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Pet Age</span>
                                         </label>
                                         <input type="number" defaultValue={petAge} placeholder="age" {...register('age', { required: true })}  className="input input-bordered" required/>
                                     </div>
                                   
                                </div>  
                                <div className="flex gap-4">
                                     <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Pet Category</span>
                                         </label>
                                         <select defaultValue={category} className="select select-bordered" {...register('category', { required: true })} required>
                                             <option disabled value="default">Category</option>
                                             <option value={'dog'}>Dog</option>
                                             <option value={'cat'}>Cat</option>
                                             <option value={'rabbit'}>Rabbit</option>
                                             <option value={'hamster'}>Hamster</option>
                                             <option value={'parrot'}>Parrot</option>
                                             <option value={'fish'}>Fish</option>
                                             <option value={'turtle'}>Turtle</option>
                                         </select>
                                     </div>  
                                       <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Location</span>
                                         </label>
                                         <input type="text" defaultValue={ownerLocation} placeholder="location" {...register('location', { required: true })}  className="input input-bordered" required/>
                                     </div>
                                </div>  
                                 <div className="flex gap-4">
                                     <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Pet Image</span>
                                         </label>
                                         <input type="file" placeholder="name" {...register('image', { required: true })}  className="input" required/>
                                     </div> 
                                        <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Date</span>
                                         </label>
                                         <DatePicker  className='border p-2 rounded-md w-full' defaultValue={deadline} selected={startDate} onChange={(date) => setStartDate(date)} />
                                     </div> 
             
                                    
                                </div>
                                     <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Short Description</span>
                                         </label>
                                         <input type="text" defaultValue={shortDesc} placeholder="aboutPet" {...register('shortDesc', { required: true })}  className="input input-bordered" required/>
                                     </div>
             
                                     <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Write about your pet</span>
                                         </label>
                                         <textarea
                                         defaultValue={longDesc}
                                          {...register('longDesc', { required: true })} 
                                         placeholder="Write something"
                                         className="textarea textarea-bordered textarea-lg w-full" rows={5} required></textarea>
                                     </div>
                                     <div className="form-control mt-6">
                                         <button className="btn btn-neutral text-white">Update Pet</button>
                                     </div>
                                 
                          </form>
        </div>
    );
};

export default UpdatePet;