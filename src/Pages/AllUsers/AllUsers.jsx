import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosSecure.get('/users');
          return res.data
        }
    })

    console.log(users);
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/user/admin/${id}`, {role: "admin"});
                    refetch()
                 Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
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
            <h3 className="text-3xl font-bold text-center">All User</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        {/* <th>
           serial
        </th> */}
        <th>Image</th>
        <th>Name</th>
        <th>Favorite Color</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            users.map((user, index) =>  <tr key={user?._id}>
            {/* <th>
                {index + 1}
            </th> */}
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={user?.userImg}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              {user?.name}
            </td>
            <td>{user?.email}</td>
            <td>
                {user?.role}
            </td>
            <th>
               <div className="badge badge-secondary badge-outline font-thin" onClick={() => handleMakeAdmin(user?._id)}>Make Admin</div>
            </th>
          </tr>)
        }
    </tbody>
 
  </table>
</div>
        </div>
    );
};

export default AllUsers;