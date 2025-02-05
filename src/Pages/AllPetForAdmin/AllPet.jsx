import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const AllPet = () => {
    const axiosSecure = useAxiosSecure();
     const {data: pets = [], refetch} = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pet');
            return res.data;
        }
     })


     const handleStatusChange = (id) => {
        Swal.fire({
            title: "Are you sure to change status?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/pet/${id}`, {adopted: true});
                    refetch();
                    Swal.fire({
                        title: "Changed!",
                        text: "Your stats has been changed.",
                        icon: "success"
                      });
                } catch (error) {
                  //  console.log(error); 
                }
          
            }
          });
     }

   
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
               await axiosSecure.delete(`/pets/${id}`)
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
            <h3 className="text-center font-bold text-3xl">All Pets</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          Serial
        </th>
        <th>Name</th>
        <th>Owner Email</th>
        <th>Owner Location</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            pets.map((pet, index) =>    <tr key={pet._id}>
                <th>
                    {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={pet?.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{pet?.petName}</div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">
                   {pet?.ownerEmail}
                </td>
                <td className="font-semibold">{pet?.ownerLocation}</td>
                <td className="font-semibold">{pet?.adopted === true ? "Adopted" : "Note Adopted"}</td>
                <th className="flex gap-3">
                    <Link to={`/dashboard/updatePet/${pet?._id}`}><FaRegEdit className="text-2xl"/></Link>
                    <MdOutlineDelete className="text-2xl" onClick={() => handleDelete(pet?._id)} />
                    <div className="badge badge-secondary badge-outline" onClick={() => handleStatusChange(pet?._id)}>Change Status</div>
                </th>
              </tr>)
        }
   
    </tbody>
 
  </table>
</div>
        </div>
    );
};

export default AllPet;