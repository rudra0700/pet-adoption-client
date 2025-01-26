import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";


const CheckoutForm = ({campaignInfo, refetch, maxAmount}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
       getPayment()
    }, [axiosSecure, campaignInfo])

    const getPayment = async () => {
       try {
        if(campaignInfo?.donatedAmount > 0){
          const {data} = await axiosSecure.post('/create-payment-intent', {amount: campaignInfo?.donatedAmount,campaign_Id: campaignInfo?.campaign_Id});
          console.log(data);
          setClientSecret(data.clientSecret)
        }
       } catch (error) {
        console.log(error);
       }
    }

    console.log(campaignInfo);
    console.log("client secret", clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            setProcessing(false)
             return;
         }

         const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
          }) 

          if(error){
            console.log("payment error", error);
          }else{
            console.log("payment method", paymentMethod);
         
          }

            //  confirm payment
        const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                email: campaignInfo?.donorEmail || 'anonymous',
                name:  campaignInfo?.donoarName || 'anonymous'
              }
            }
          })

   
  
          if(paymentIntent?.status === 'succeeded'){
             try {
               await axiosSecure.post('/donation', {...campaignInfo, transId: paymentIntent?.id});
               await axiosSecure.patch(`/donation/amount/${campaignInfo?.campaign_Id}`, {
                 updateAmount : (maxAmount - campaignInfo?.donatedAmount),
                 status: "decrease"
                })
                toast.success("Donate successfully");
               refetch()
             } catch (error) {
              console.log(error);
             }
          }

          console.log(paymentIntent)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="w-[80%] mx-auto mt-2">
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
           
          <button type="submit" className='btn btn-neutral mt-5 w-full' disabled={!stripe}>
               pay 
          </button>
            </form>
        </div>
    );
};

export default CheckoutForm;