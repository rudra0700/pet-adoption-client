import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddPet = () => {
    const [startDate, setStartDate] = useState(new Date())
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth()

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
                deadline: startDate
            }
            console.log(petInfo);
            await axiosSecure.post('/pets', petInfo);
            toast.success("Added pet successfully");
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <div className="px-8">
            <h2 className="text-3xl font-semibold text-center">Add Your Pet</h2>
             <form onSubmit={handleSubmit(onSubmit)}>
                   <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Pet Name</span>
                            </label>
                            <input type="text" placeholder="name" {...register('name', { required: true })}  className="input input-bordered" required/>
                        </div>  
                          <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Pet Age</span>
                            </label>
                            <input type="number" placeholder="age" {...register('age', { required: true })}  className="input input-bordered" required/>
                        </div>
                      
                   </div>  
                   <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Pet Category</span>
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
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" placeholder="location" {...register('location', { required: true })}  className="input input-bordered" required/>
                        </div>
                   </div>  
                    <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Pet Image</span>
                            </label>
                            <input type="file" placeholder="name" {...register('image', { required: true })}  className="input" required/>
                        </div> 
                           <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <DatePicker  className='border p-2 rounded-md w-full' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div> 

                       
                   </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Short Desc</span>
                            </label>
                            <input type="text" placeholder="aboutPet" {...register('shortDesc', { required: true })}  className="input input-bordered" required/>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
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