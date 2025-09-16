import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { createResume, fetchProfile } from "../lib/api.js";
import { signup as signupApi } from "../lib/api.js"; // Ensure you import your signup API function

const UserContext = createContext(); // Create context

const UserProvider = ({ children }) => {
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
        const response = await fetchProfile();
        console.log("Fetched user response:", response.data); // Log the entire response

        // Assuming the user data is in response.profile
        if (response.profile) {
          setUser(response.profile); // Set user state with the profile object
        } else {
          console.log("User data not found in response");
          clearUser(); // Clear user if data not found
        }
      } catch (error) {
        console.log("User is not authenticated:", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      const { token, userData } = response.data;

      localStorage.setItem("token", token);
      setUser(userData);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const signup = async (payload) => {
    try {
        const response = await signupApi(payload);
        console.log("API Response:", response); // Log the complete response

        // Check if response has a user object
        if (response && response.user) {
            setUser(response.user); // Set the user in context
            return response; // Return the response for further use
        } else {
            throw new Error("Signup failed: User object not returned or response is malformed.");
        }
    } catch (error) {
        // Log specific API error messages if available
        if (error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || 'Signup failed due to a server error.');
        } else {
            console.error("Signup error:", error);
            throw new Error('Signup failed: Network error or unexpected response.');
        }
    }
};


const Resume = async(resumeData)=>{
  try {
    const response = await createResume(resumeData)
    return response.data
  }
  catch (error) {
    console.log("Error in creating resume", error)
  }
}

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser, login, signup, Resume }}>
      {children}
    </UserContext.Provider>
  );
};

// Only export once
export { UserProvider, UserContext };