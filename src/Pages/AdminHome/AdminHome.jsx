import useAuth from "../../Hooks/useAuth";


const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div className="px-8">
            <span className="text-3xl">Hi! welcome </span>
             <span className="text-3xl">
                {
                    user?.displayName ? user?.displayName : "Back"
                }
             </span>
        </div>
    );
};

export default AdminHome;