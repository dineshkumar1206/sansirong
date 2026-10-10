import config from '../src/config';
import React, { useState, useEffect } from 'react';
import { BsClipboard } from 'react-icons/bs';
import InterviewListModal from './InterviewListModal';
import AddEmployeeModal from './AddEmployeeModal';

const DashboardHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalCandidates: 0,
    ratedGood: 0,
    joined: 0,
    techRatingMix: { good: 0, average: 0, low: 0 }
  });

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/interview-stats`)
      .then(res => res.json())
      .then(data => {
        setStats({
          totalCandidates: data.totalCandidates || 0,
          ratedGood: data.ratedGood || 0,
          joined: data.joined || 0,
          techRatingMix: data.techRatingMix || { good: 0, average: 0, low: 0 }
        });
      })
      .catch(err => console.error('Failed to fetch interview stats', err));
  }, []);
  return (
    <div className="w-full bg-white flex items-center justify-between px-8 md:px-16 py-4 shadow-sm border-b border-gray-200">
      {/* Left Section: Logos and Titles */}
      <div className="flex items-center">
        {/* Logo Box */}
        <div className="flex items-center bg-[#1e2329] bg-gradient-to-b from-[#3a4454] to-[#1e2329] border border-[#4a5568] rounded-md px-4 py-2 shadow-lg">
          {/* Actual Logo Icon */}
          <img 
            src="/logo1.png" 
            alt="Sansirong Logo" 
            className="w-10 h-10 object-contain mr-3"
          />
          
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl leading-tight tracking-wider">
              SANSIRONG
            </span>
            <span className="text-white text-[9px] font-semibold tracking-widest uppercase">
              International Private Limited
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-[2px] bg-red-600 mx-5"></div>

        {/* Title Section */}
        <div className="flex flex-col">
          <h1 className="text-gray-900 font-bold text-lg tracking-wide uppercase">
            Workforce Intelligence
          </h1>
          <p className="text-gray-500 text-[10px] font-semibold tracking-widest uppercase">
            OSS Engineering Deployment · Chennai
          </p>
        </div>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* Back to website Button */}
        <a href="/" className="group flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer no-underline">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Website</span>
        </a>

        {/* Add Employee Button */}
        <button 
          onClick={() => setIsEmployeeModalOpen(true)}
          className="group flex items-center space-x-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg px-5 py-2.5 text-sm font-bold shadow-md shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-500 transition-all duration-300 cursor-pointer"
        >
          <span className="text-xl leading-none transform group-hover:rotate-90 transition-transform duration-300">+</span>
          <span>Add Employee</span>
        </button>

        {/* Interview List Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-5 py-2.5 text-sm font-bold shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 cursor-pointer"
        >
          <BsClipboard className="text-base transform group-hover:scale-110 transition-transform duration-300" />
          <span>Interview List</span>
        </button>
      </div>

      <InterviewListModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        stats={stats}
      />

      {isEmployeeModalOpen && (
        <AddEmployeeModal 
          onClose={() => setIsEmployeeModalOpen(false)} 
          onSuccess={() => {
            // Optional: You could trigger a refresh of dashboard stats here
            setIsEmployeeModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardHero;
