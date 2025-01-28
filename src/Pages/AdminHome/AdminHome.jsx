import useAuth from "../../Hooks/useAuth";


const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <span>Hi! welcome </span>
            {
                user?.displayName ? user?.displayName : "Back"
            }
        </div>
    );
};

export default AdminHome;