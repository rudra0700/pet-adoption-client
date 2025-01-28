import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const MyCampaigns = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedCampaign, setSelectedCampaign] = useState(null)
    const {data: campaigns = []} = useQuery({
        queryKey: ["campaigns"],
        queryFn: async () => {
            const res = await axiosSecure.get('/campaigns');
            return res.data
        }
    })

    const {data: donations, isLoading} = useQuery({
      queryKey: ["donations", selectedCampaign],
      queryFn: async () => {
        const res = await axiosSecure.get(`/donations/${selectedCampaign}`);
        return res.data
      },
    })
   
    if(isLoading) return <p>Loading...</p>
    console.log(donations);

    const handleViewDonators = (id) => {
      setSelectedCampaign(id)
      document.getElementById("my_modal_4").showModal();
    }
    
    return (
        <div className="border border-black">
            <h3 className="text-3xl font-bold text-center">My Campaigns</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial</th>
        <th>Name</th>
        <th>Maximum amount</th>
        <th>Progress</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
         {
           campaigns.map((campaign, index) =>  <tr key={campaign?._id}>
           <th>{index + 1}</th>
           <td>{campaign?.petName}</td>
           <td>$ {campaign?.maxAmount}</td>
           <td><progress className="progress progress-success w-56" value="40" max="100"></progress></td>

           <td className="flex gap-2">
                <Link to={`/dashboard/updateCampaign/${campaign?._id}`}><FaRegEdit className="text-2xl"/></Link>
                <IoIosPause className="text-2xl" />
           </td>
           <td>
               <div className="badge badge-secondary badge-outline" onClick={() => handleViewDonators(campaign?._id)}>View Donators</div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
              {/* <button className="btn" >open modal</button> */}
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <h3 className="font-bold text-lg text-center">All Donors for {campaigns.find(campaign => campaign._id === selectedCampaign)?.petName}</h3>
                   <div>
                       {donations.length > 0 ? <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial</th>
        <th>Name</th>
        <th>Email</th>
        <th>Donated Amount</th>
        <th>Transection Id</th>
      </tr>
    </thead>
    <tbody>
      {
        donations.map((donation, index) =>   <tr key={donation._id}>
          <th>{index + 1}</th>
          <td>{donation?.donoarName}</td>
          <td>{donation?.donorEmail}</td>
          <td>$ {donation?.donatedAmount}</td>
          <td>$ {donation?.transId}</td>
        </tr>)
      }
      {/* row 1 */}
    
    </tbody>
  </table>
</div> : <p>No Data found for this campaign</p>}
                   </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
           </td>
         </tr>)
         }
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyCampaigns;