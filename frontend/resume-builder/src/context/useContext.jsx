import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { profile } from "../lib/api";

export const UsContext = createContext(); // Capitalized to follow convention

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("token");

            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(profile);
                setUser(response.data);
            } catch (error) {
                console.log("User is not authenticated", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };

        fetchUser(); // Call fetchUser on mount
    }, []); // Empty dependency array to run once on mount

    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UsContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UsContext.Provider>
    );
};

export default UserContext;