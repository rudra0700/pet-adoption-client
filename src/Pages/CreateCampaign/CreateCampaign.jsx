import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreateCampaign = () => {
      const { register, handleSubmit, watch, formState: { errors } } = useForm();
      const [startDate, setStartDate] = useState(new Date());
      const axiosPublic = useAxiosPublic();
      const axiosSecure = useAxiosSecure();
      const navigate = useNavigate()
      const {user} = useAuth();
      
      const onSubmit = async (data) => {
        const imageFile = {image: data.image[0]};
        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
 
            const campaignInfo = {
                petName: data?.name,
                image: res.data?.data?.display_url,
                maxAmount: parseFloat(data?.amount),
                deadline: startDate,
                shortDesc: data?.shortDesc,
                longDesc: data?.longDesc,
                campaignOwnerEmail: user?.email,
                campaignOwnerImg: user?.photoURL,
                campaignOwnerName:user?.displayName,
            };

           await axiosSecure.post('/campaigns', campaignInfo);
           toast.success("campaigns added successfully");
            navigate('/dashboard/myCampaigns')
        } catch (error) {
            // console.log(error);
        }
      }
    return (
        <div className="px-8">
            <h3 className="text-3xl font-bold text-center">Create Campaigns</h3>
             <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
             <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pet Name</span>
                            </label>
                            <input type="text" placeholder="name" {...register('name', { required: true })}  className="input input-bordered" required/>
                        </div>  
                         <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pet image</span>
                            </label>
                            <input type="file" placeholder="image" {...register('image', { required: true })}  className="input border-none outline-none" required/>
                        </div>  
                      
                   </div>    
                    <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Deadline</span>
                            </label>
                              <DatePicker  className='border p-2 rounded-md w-full' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>  
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Maximum amount</span>
                            </label>
                            <input type="number" placeholder="amount" {...register('amount', { required: true })}  className="input input-bordered" required/>
                        </div>
                       
                   </div>  

                   <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Short Description</span>
                            </label>
                            <input type="text" placeholder="write your thought" {...register('shortDesc', { required: true })}  className="input input-bordered" required/>
                        </div>

                   <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Write details about your campaign</span>
                            </label>
                            <textarea
                             {...register('longDesc', { required: true })} 
                            placeholder="Write something"
                            className="textarea textarea-bordered textarea-lg w-full" rows={5} required></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral text-white">Create</button>
                        </div>
             </form>
        </div>
    );
};

export default CreateCampaign;