import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { format } from 'date-fns';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../Components/CheckoutForm';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLIC_KEY);

const DonationDetails = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const [amount, setAmount] = useState();
    const {data: campaign = {}, isLoading, refetch } = useQuery({
        queryKey: ["campaign", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaign/${id}`);
            return res.data
        }
    })
    const {longDesc, maxAmount, petName, deadline, image, _id, 
        campaignOwnerEmail} = campaign;

    const [campaignInfo, setCampaignInfo] = useState({
        donorEmail: user?.email,
        donoarName: user?.displayName,
        donorImage: user?.photoURL,
        campaign_Id: _id,
        petName: petName,
        image: image,
        donatedAmount : amount,
        campaignOwnerEmail: campaignOwnerEmail

    })

    const handleAmount = (value) => {
        if(isNaN(value) || value === ""){
            setAmount(1);
            return toast.error("Please enter a valid amount")
        }
        if(value > maxAmount){
            setAmount(maxAmount)
            return toast.error("Maximum donate has been done")
        }
        if(value < 1){
            setAmount(1);
            return toast.error("Amount cant be less than 1")
        }
        setAmount(value);
        setCampaignInfo(prev => {
            return {...prev, donatedAmount: value}
          })
    }

    if(isLoading) return <p>Loading...</p>
    console.log(campaign);
    console.log(amount);

 
    return (
        <div className='w-[700px] mx-auto mt-20'>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                    className='w-96 h-96 object-cover'
                    src={image}
                    alt="Movie" />
                </figure>
                <div className="w-[70%] ml-5 mt-5">
                    <h2 className="card-title uppercase">{petName}</h2>
                    <p>We need : $ {maxAmount}</p>
                    <p>Last Date : {format(new Date(deadline), "P")}</p>
                    <p>{longDesc}</p>
                    <div className="card-actions mt-3">
                       <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>Want to Donate</button>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        {/* <button className="btn" >open modal</button> */}
                        <dialog id="my_modal_1" className="modal text-center">
                        <div className="modal-box">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src={image} />
                            </div>
                        </div>
                            <h3 className="font-bold text-lg">{petName}</h3>
                            <p className="">Max amount you can donate: $ {maxAmount}</p>
                            <input value={amount} onChange={(e) => handleAmount(parseInt(e.target.value))} type="number" className='mt-2 border-2' />
                              {/* checkout form */}
                                <Elements stripe={stripePromise}>
                                   <CheckoutForm  campaignInfo={campaignInfo} refetch={refetch} maxAmount={maxAmount}></CheckoutForm>
                                </Elements>
                            <div className="">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn w-[80%] mx-auto mt-2 btn-neutral">Cancel</button>
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

export default DonationDetails;