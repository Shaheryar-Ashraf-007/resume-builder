import { axiosInstance } from "./axios"


export const Signup = async(signupData) =>{

    try {
        const response = await axiosInstance.post('/auth/signup', signupData)
    return response.data
        
    } catch (error) {
        if (error.response) {
      console.error("Error details:", error.response.data);
      throw new Error(error.response.data.message || "Signup failed");
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error during signup"); 
    }
  }
        
}

export async function profile(profileData) {

    try {
        const response = await axiosInstance.get('/auth/profile', profileData)
        return response.data
    } catch (error) {
        if (error.response) {
      console.error("Error details:", error.response.data);
      throw new Error(error.response.data.message || "Signup failed");
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error during signup"); 
    }
       

        
    }
    
}