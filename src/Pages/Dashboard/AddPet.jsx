import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddPet = () => {
    const [startDate, setStartDate] = useState(new Date())
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const navigate = useNavigate()

      const onSubmit = async (data) => {
        console.log(data);
        const imageFile = {image: data.image[0]}
        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            console.log(res.data);
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
            console.log(petInfo);
            await axiosSecure.post('/pets', petInfo);
            toast.success("Added pet successfully");
            navigate('/dashboard/myAddedPets')
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <div className="px-8">
            <h2 className="text-3xl font-semibold text-center mb-3">Add Your Pet</h2>
             <form onSubmit={handleSubmit(onSubmit)}>
                   <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pet Name</span>
                            </label>
                            <input type="text" placeholder="name" {...register('name', { required: true })}  className="input input-bordered" required/>
                        </div>  
                          <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pet Age</span>
                            </label>
                            <input type="number" placeholder="age" {...register('age', { required: true })}  className="input input-bordered" required/>
                        </div>
                      
                   </div>  
                   <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pet Category</span>
                            </label>
                            <select defaultValue="default" className="select select-bordered" {...register('category', { required: true })} required>
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
                            <input type="text" placeholder="location" {...register('location', { required: true })}  className="input input-bordered" required/>
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
                            <DatePicker  className='border p-2 rounded-md w-full' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div> 

                       
                   </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Short Description</span>
                            </label>
                            <input type="text" placeholder="aboutPet" {...register('shortDesc', { required: true })}  className="input input-bordered" required/>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Write details about your pet</span>
                            </label>
                            <textarea
                             {...register('longDesc', { required: true })} 
                            placeholder="Write something"
                            className="textarea textarea-bordered textarea-lg w-full" rows={5} required></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral text-white">Add Pet</button>
                        </div>
                    
             </form>
        </div>
    );
};

export default AddPet;