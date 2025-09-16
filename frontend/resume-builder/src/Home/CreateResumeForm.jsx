import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Input from "../pages/Auth/components/Input"; // Adjust the import path as needed
import { IoCloseSharp } from "react-icons/io5";

const CreateResumeForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/resume/create-resume", { title });
      console.log("Resume created successfully", response.data);

      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
        onClose(); // Close the modal after successful creation
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleCloseModal = () => {
    setTitle(""); // Optional: clear the title when closing
    setError(null); // Optional: reset error state
    onClose(); // Trigger the parent modal close function
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Create New Resume</h2>
        <IoCloseSharp onClick={handleCloseModal} className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
      </div>
      <p className="text-gray-600 text-center mb-4">
        Give your resume a title to get started. You can edit all details later.
      </p>
      <form onSubmit={handleCreateResume} className="space-y-4">
        <Input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Resume Title"
          className="border rounded-lg p-2 w-full"
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;