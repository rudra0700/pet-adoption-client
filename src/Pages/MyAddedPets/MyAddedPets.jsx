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

  
    const handleUpdate = (id) => {
        
    }

    return (
        <div className="border border-black p-8">
            <h3 className="text-3xl font-bold text-center">My Added Pets</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial</th>
        <th>Name</th>
        <th>Category</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
         {
            pets.map((pet, index) =>   <tr key={pet._id}>
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
                <td>
                   {pet?.category}
                </td>
                 <td>
                    {pet.adopted === true ? "Adopted" : "Not Adopted" }
                 </td>
                <td className="flex gap-2 items-center mt-3">
                    <Link to={`/dashboard/updatePet/${pet?._id}`}><FaRegEdit className="text-2xl"/></Link>
                    
                    <MdOutlineDelete className="text-2xl" onClick={() => handleDelete(pet?._id)} />
                </td>
              </tr>)
         }
    
    </tbody>
 
   
  </table>
</div>
        </div>
    );
};

export default MyAddedPets;