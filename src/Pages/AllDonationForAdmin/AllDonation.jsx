import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const AllDonation = () => {
    const axiosSecure = useAxiosSecure();
    const {data : campaigns = [], refetch} = useQuery({
        queryKey: ["campaigns"],
        queryFn: async () => {
            const res = await axiosSecure.get('/allDonation');
            return res.data
        }
    });

      const handleDelete = (id) => {
             Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!"
             }).then(async (result) => {
               if (result.isConfirmed) {
                 try {
                   await axiosSecure.delete(`/campaign/${id}`)
                   refetch()
                      Swal.fire({
                   title: "Deleted!",
                   text: "Your file has been deleted.",
                   icon: "success"
                 });
                   
                 } catch (error) {
                  //  console.log(error);
                 }
              
               }
             });
           }
    return (
        <div>
            <h3 className="text-3xl text-center font-bold">All Donations Campaigns</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
           Serial
        </th>
        <th>Pet Image</th>
        <th>Max Amount</th>
        <th>Deadline</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        {
            campaigns.map((campaign, index) => 
                <tr key={campaign._id}>
                  <th>
                     {index + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={campaign?.image}
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">
                     $ {campaign?.maxAmount}
                  </td>
                  <td className="font-semibold">{format(new Date(campaign?.deadline), "P")}</td>
                  
                  <th className="flex gap-3">
                    <Link to={`/dashboard/updateCampaign/${campaign?._id}`}><FaRegEdit className="text-2xl"/></Link>
                    <MdOutlineDelete className="text-2xl" onClick={() => handleDelete(campaign?._id)} />
                </th>
                  
                </tr>)
        }
    </tbody>
 
  </table>
</div>
        </div>
    );
};

export default AllDonation;