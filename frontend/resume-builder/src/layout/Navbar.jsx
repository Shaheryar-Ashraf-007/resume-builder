import ProfileInfoCard from '@/cards/ProfileInfoCard';
import React from 'react';

const Navbar = () => {
    return (
        <div className="bg-[#0c0c0c] text-white">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-2xl font-bold">Resume Builder</div>
                <div className="flex-shrink-0">
                    <ProfileInfoCard />
                </div>
            </div>
        </div>
    );
};

export default Navbar;