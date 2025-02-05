import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyAddedPets = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: pets = [], isLoading, refetch} = useQuery({
        queryKey: ['pets', user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/pets/${user?.email}`);
            return res.data;
        }
    })

  
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
            // console.log(error);
          }
       
        }
      });
    }

    const handleAdopt = (id) => {
      Swal.fire({
        title: "Are you sure to change status?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
             await axiosSecure.patch(`/pet/${id}`, {adopted: true});
             refetch();
          Swal.fire({
            title: "Changed!",
            text: "Status has been deleted.",
            icon: "success"
          });
        }
      });
    }

    return (
        <div className="p-8">
            <h3 className="text-3xl font-bold text-center">My Added Pets</h3>
            <div className="overflow-x-auto mt-4">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial</th>
        <th>Name</th>
        <th>Category</th>
        <th>Status</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
         {
           pets.length > 0 ?  pets.map((pet, index) =>   <tr key={pet._id}>
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
                 <div className="text-sm opacity-50">{pet?.ownerLocation}</div>
               </div>
             </div>
           </td>
           <td className="font-semibold">
              {pet?.category}
           </td>
            <td className="font-semibold">
               {pet.adopted === true ? "Adopted" : "Not Adopted" }
            </td>
           <td className="flex gap-2 items-center mt-3">
               <Link to={`/dashboard/updatePet/${pet?._id}`}><FaRegEdit className="text-2xl"/></Link>
               
               <MdOutlineDelete className="text-2xl" onClick={() => handleDelete(pet?._id)} />
           </td> 
           <td>
              <div className="badge badge-secondary badge-outline" onClick={() => handleAdopt(pet?._id)}>Adopt</div>
           </td>
         </tr>) : <p className="text-2xl font-semibold mt-3">You have not added any pet yet</p>
           
         }
    
    </tbody>
 
   
  </table>
</div>
        </div>
    );
};

export default MyAddedPets;