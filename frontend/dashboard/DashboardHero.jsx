import React from 'react';
import { BsClipboard } from 'react-icons/bs';

const DashboardHero = () => {
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
      <div className="flex items-center space-x-3">
        {/* Live View Button */}
        <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.7)]"></div>
          <span>LIVE VIEW</span>
        </button>

        {/* Add Employee Button */}
        <button className="flex items-center space-x-1 bg-green-600 text-white rounded-md px-4 py-2 text-sm font-bold shadow-md hover:bg-green-700 transition-colors">
          <span className="text-lg leading-none mr-1">+</span>
          <span>Add Employee</span>
        </button>

        {/* Interview List Button */}
        <button className="flex items-center space-x-2 bg-[#8bc34a] text-black rounded-md px-4 py-2 text-sm font-bold shadow-md hover:bg-[#7cb342] transition-colors">
          <BsClipboard className="text-base" />
          <span>Interview List</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHero;
