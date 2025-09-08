import React, { useContext } from 'react';
import { UserContext } from '../context/useContext';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);

    const handleLogout = () => {
        clearUser(); 
    };

    if (!user) return null;

    return (
        <div className="flex items-center">
            <img
                src={user.profileImageUrl}
                alt="profile"
                className="w-11 h-11 bg-gray-300 rounded-full mr-3"
            />
            <div className="text-[15px] font-bold leading-3 text-white">
                {user.username}
            </div>
            <button onClick={handleLogout} className="text-purple-500 text-sm font-semibold cursor-pointer hover:underline">
                Logout
            </button>
        </div>
    );
};

export default ProfileInfoCard