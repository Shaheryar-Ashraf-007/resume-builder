import React, { useState, useContext } from 'react';
import { Button } from "@/components/modern-ui/button"; // Adjust the import path as necessary
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import ProfilePhotoSelector from './components/ProfilePhotoSelector'; // Adjust the import path as necessary
import { UserContext } from '../../context/useContext'; // Adjust the import path as necessary

const Signup = () => {
  const { signup } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const payload = {
      username,
      email,
      password,
      profileImageUrl: profileImageUrl || null,
    };

    console.log("Payload being sent:", payload);

    try {
    const response = await signup(payload);
    toast.success("User Created Successfully");
    navigate("/dashboard");
    return response
} catch (error) {
    console.error("Error in Signup:", error);
    setError(error.message || 'Signup failed');
    toast.error(error.message || 'Signup failed');
}
  };

  return (
    <div className="bg-black w-full h-full flex items-center justify-center">
      <form
        className="bg-[#0c0c0c] p-8 rounded-2xl mt-8 shadow-xl w-110 mb-8 border"
        onSubmit={handleSignup}
      >
        <h2 className="text-white text-3xl font-extrabold mb-2 text-center">
          Create Account
        </h2>
        <span className="text-gray-400 text-sm block mb-6 text-center">
          Please fill in your details to sign up
        </span>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Profile Photo */}
        <div className="mb-4 flex justify-center">
          <ProfilePhotoSelector setPreview={setProfileImageUrl} />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="username">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-white p-3 border border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="John@gmail.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-white p-3 border border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="Min 6 characters"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-white p-3 border border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full text-white p-3 border border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold shadow-md transition-all"
        >
          Sign Up
        </Button>

        <div className="text-center text-gray-400 mt-6">
          <span>Already have an account? </span>
          <Link to="/login" className="text-pink-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;