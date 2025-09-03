import React, { useState, useContext } from 'react';
import { Button } from "@/components/modern-ui/button"; // Adjust the import path if necessary
import { UsContext } from '../../context/useContext'; // Adjust the import path
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(UsContext); // Use context to access the login function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="bg-black w-full h-screen flex items-center justify-center">
      <form
        className="bg-[#0c0c0c] p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-white text-2xl font-bold mb-2">Welcome Back</h2>
        <span className='text-white'>Please add your details to log in</span>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-white p-2 border border-gray-600 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-white p-2 border border-gray-600 rounded"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded"
        >
          Login
        </Button>

        <div className="text-center text-white mt-4">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-pink-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;