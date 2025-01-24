import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import { Link } from "react-router-dom";

const MyCampaigns = () => {
    const axiosSecure = useAxiosSecure();
    const {data: campaigns = []} = useQuery({
        queryKey: ["campaigns"],
        queryFn: async () => {
            const res = await axiosSecure.get('/campaigns');
            return res.data
        }
    })

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
           campaigns.map((campaign, index) =>  <tr key={campaign._id}>
           <th>{index + 1}</th>
           <td>{campaign?.petName}</td>
           <td>$ {campaign?.maxAmount}</td>
           <td><progress className="progress progress-success w-56" value="40" max="100"></progress></td>

           <td className="flex gap-2">
                <Link to={`/dashboard/updateCampaign/${campaign?._id}`}><FaRegEdit className="text-2xl"/></Link>
                <IoIosPause className="text-2xl" />
           </td>
           <td>
               <div className="badge badge-secondary badge-outline">View Donators</div>
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