import React from 'react';
import useAuth from '../../Hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className='text-3xl'>
                <span>Hi! Welcome</span>
                <span className='ml-3'>
                     {user?.displayName ? user?.displayName : "Back"}
                </span>
            </h2>
        </div>
    );
};

export default UserHome;