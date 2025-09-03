import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { fetchProfile } from "../lib/api"; // Ensure the correct import

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
                const response = await fetchProfile(); // Call the profile fetching function
                setUser(response);
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

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post('/auth/login', credentials); 
            const { token, userData } = response.data; 
            
            localStorage.setItem("token", token);
            setUser(userData);
        } catch (error) {
            console.error("Login failed", error);
            throw error; 
        }

    };

    const Signup = async (credentials)=>{
        try {
            const response = await axiosInstance.post('/auth/signup', credentials);
            setUser(response.data.user); 
            return response.data; 
        } catch (error) {
            console.error("Signup error:", error);
            throw new Error(error.response?.data?.message || "Signup failed");
        }
    }

    return (
        <UsContext.Provider value={{ user, loading, updateUser, clearUser, login, Signup }}>
            {children}
        </UsContext.Provider>
    );
};

export default UserContext;