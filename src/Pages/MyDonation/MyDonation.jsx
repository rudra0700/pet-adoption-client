import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const MyDonation = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: donations = [], refetch} = useQuery({
        queryKey: ["donations"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation/${user?.email}`);
            return res.data;
        }
    })


    console.log(donations);


    const handleRefund = (id) => {
        Swal.fire({
            title: "Are you sure to refund?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/refund/${id}`);
                    refetch();
                         Swal.fire({
                title: "",
                text: "Refund successful.",
                icon: "success"
              });
                } catch (error) {
                    console.log(error);
                }
         
            }
          });
    } 
    return (
        <div>
            <h3 className='text-3xl font-bold text-center'>My Donation</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
           Serial
        </th>
        <th>Image</th>
        <th>Pet Name</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            donations.map((donation, index) =>   <tr key={donation?._id}>
                <th>
                   {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                        //    referrerPolicy='no-referrer'
                          src={donation?.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className='font-semibold'>
                  {donation?.petName}
                </td>
                <td className='font-semibold'>$ {donation?.donatedAmount}</td>
                <th>
                   <div className="badge badge-secondary badge-outline" onClick={() => handleRefund(donation?._id)}>Refund</div>
                </th>
              </tr>)
        }
    
   
    
   
    </tbody>

  </table>
</div>
        </div>
    );
};

export default MyDonation;