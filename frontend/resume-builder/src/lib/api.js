import { axiosInstance } from "./axios";

export const Signup = async (signupData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
  } catch (error) {
    console.log("Error in Signup", error)
  }
};

export const Login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    console.log("Error in Login", error)
  }
};

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.log("Internal error",error)
  }
};

// Helper function for error handling
