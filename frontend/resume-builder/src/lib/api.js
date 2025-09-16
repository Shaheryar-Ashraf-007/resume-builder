import { axiosInstance } from "./axios";


export const signup = async (signupData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", signupData)

    return response.data
  } catch (error) {
    console.log("Error in Signup",error)
    
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
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    console.log("No access token found");
    return null; // No token available
  }

  try {
    const response = await axiosInstance.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}` // Include the token in the request headers
      }
    });

    return response.data;
  } catch (error) {
    console.log("Error in response", error);
    return null; // Return null or handle the error appropriately
  }
};

export const fetchResume = async()=>{
  try {
    const response = await axiosInstance.get("/resume")
    return response.data
  } catch (error) {
    console.log("Error in fetching resume", error)
    
  }
}

export const createResume = async(resumeData)=>{
  try {
    const response = await axiosInstance.post("/resume/create-resume", resumeData)
    return response.data
  }
  catch (error) {
    console.log("Error in creating resume", error)
}}