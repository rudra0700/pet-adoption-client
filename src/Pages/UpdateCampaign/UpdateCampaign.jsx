import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateCampaign = () => {
      const { register, handleSubmit, watch, formState: { errors } } = useForm();
      const axiosSecure = useAxiosSecure();
      const axiosPublic = useAxiosPublic()
      const {id} = useParams();
      const {data: campaign = {}, isLoading} = useQuery({
          queryKey: ["campaign", id],
          queryFn : async () => {
              const res = await axiosSecure.get(`/campaign/${id}`);
              return res.data
            }
        })
        
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
                };
                
                await axiosSecure.patch(`/campaign/${id}`, campaignInfo);
                toast.success("campaign updated successfully")
            } catch (error) {
                // console.log(error);
            }
        }
        
        console.log(campaign);
        const {petName, shortDesc, longDesc, maxAmount, deadline} = campaign || {};
        const [startDate, setStartDate] = useState(deadline);
    return (
        <div className="px-8">
             <h3 className="text-center font-bold text-3xl">Update Your Campaign</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                          <div className="flex gap-4">
                                     <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Pet Name</span>
                                         </label>
                                         <input type="text" defaultValue={petName} placeholder="name" {...register('name', { required: true })}  className="input input-bordered" required/>
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
                                           <DatePicker defaultValue={deadline}  className='border p-2 rounded-md w-full' selected={startDate} onChange={(date) => setStartDate(date)} />
                                     </div>  
                                     <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Maximum amount</span>
                                         </label>
                                         <input type="number" defaultValue={maxAmount} placeholder="amount" {...register('amount', { required: true })}  className="input input-bordered" required/>
                                     </div>
                                    
                                </div>  
             
                                <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Short Description</span>
                                         </label>
                                         <input type="text" defaultValue={shortDesc} placeholder="write your thought" {...register('shortDesc', { required: true })}  className="input input-bordered" required/>
                                     </div>
             
                                <div className="form-control w-full">
                                         <label className="label">
                                             <span className="label-text font-semibold">Write Details about your campaign</span>
                                         </label>
                                         <textarea
                                          {...register('longDesc', { required: true })} 
                                          defaultValue={longDesc}
                                         placeholder="Write something"
                                         className="textarea textarea-bordered textarea-lg w-full" rows={5} required></textarea>
                                     </div>
                                     <div className="form-control mt-6">
                                         <button className="btn btn-neutral text-white">Update</button>
                                     </div>
                          </form>
        </div>
    );
};

export default UpdateCampaign;