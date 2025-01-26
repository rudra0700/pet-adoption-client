import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


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
    return (
        <div>
            <h3 className="text-3xl font-bold text-center">All User</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
           serial
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Favorite Color</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            users.map((user, index) =>  <tr key={user?._id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
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
            <th>
            <div className="badge badge-secondary badge-outline font-thin">Make Admin</div>
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