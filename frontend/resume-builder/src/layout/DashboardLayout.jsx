import { useContext } from "react";

import { UserContext } from "@/context/useContext";
import Navbar from "./Navbar";
const DashboardLayout = ({ children, activeMenu }) => {
    const { user, loading } = useContext(UserContext);

  console.log("User",user)

    if (loading) {
        return <div>Loading...</div>; 
    }

    console.log("User in DashboardLayout:", user); // Log the user object

    return (
        <div>
            <Navbar activeMenu={activeMenu} />
            {user ? (
                <div className="container mx-auto pt-4 pb-4 text-white">
                    {children}
                </div>
            ) : (
                <div>Please log in.</div>
            )}
        </div>
    );
};

export default DashboardLayout