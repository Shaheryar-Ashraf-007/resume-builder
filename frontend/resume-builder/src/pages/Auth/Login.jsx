import React, { useState, useContext } from 'react';
import { Button } from "@/components/modern-ui/button"; 
import { UsContext } from '../../context/useContext'; 
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const { login } = useContext(UsContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await login({ email, password });
      navigate("/dashboard"); 
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
          <label className="block text-white mb-2" htmlFor="Email">
            Email
          </label>
          <input
            type="text"
            placeholder='John@gmail.com'
            id="email"
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
            placeholder='Min 6 characters'
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
