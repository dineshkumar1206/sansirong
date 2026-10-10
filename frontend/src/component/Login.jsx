import config from '../config';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');`}
      </style>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-[#111827] to-black relative overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fa160e]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div 
        data-aos="fade-up"
        className="backdrop-blur-xl bg-gray-800/60 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700/50 relative z-10"
      >
        <div className="text-center mb-8" data-aos="zoom-in" data-aos-delay="100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 border border-gray-700 mb-4 shadow-lg">
            <svg className="w-8 h-8 text-[#fa160e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Admin Login</h2>
          <div className="text-white text-sm mt-3 font-medium" style={{ color: 'white' }}>Welcome back! Please enter your details.</div>
        </div>

        {error && (
          <div data-aos="shake" className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-center text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div data-aos="fade-up" data-aos-delay="200">
            <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-white bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#fa160e] focus:ring-1 focus:ring-[#fa160e] transition-all duration-300 placeholder-gray-500"
              placeholder="admin@sansirong.com"
              required
            />
          </div>
          
          <div data-aos="fade-up" data-aos-delay="300">
            <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-white bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#fa160e] focus:ring-1 focus:ring-[#fa160e] transition-all duration-300 placeholder-gray-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="400" className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fa160e] to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#fa160e] hover:shadow-[0_0_20px_rgba(250,22,14,0.3)] transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
