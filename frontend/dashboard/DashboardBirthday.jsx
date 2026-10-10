import config from '../src/config';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashboardBirthday = () => {
  const [data, setData] = useState({
    monthName: '',
    count: 0,
    birthdays: []
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetch(`${config.API_BASE_URL}/api/birthdays`)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error('Failed to fetch birthdays', err));
  }, []);
  
  return (
    <div className="w-full font-sans px-8 md:px-16 pb-12 mt-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6" data-aos="fade-down">
        <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-rose-600 rotate-45 shadow-sm shadow-red-500/50"></div>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 font-extrabold tracking-widest text-sm uppercase">
          Upcoming Birthdays
        </h2>
      </div>

      {/* Main Card */}
      <div 
        data-aos="fade-up" 
        data-aos-delay="100"
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-red-200/50 p-6 mb-6 group"
      >
        
        {/* Card Header */}
        <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
              <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase group-hover:text-red-600 transition-colors">
                {data.monthName || 'Loading...'}
              </h3>
              <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md shadow-red-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold ml-2">
                {data.count}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">
              Team birthdays — from OSS & office staff records
            </p>
          </div>
          <div className="hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-200 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.birthdays.length > 0 ? data.birthdays.map((item, index) => (
            <div 
              key={index} 
              data-aos="zoom-in" 
              data-aos-delay={`${(index % 10) * 100}`}
              className="bg-white border border-gray-100 rounded-xl flex items-center p-3 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-red-200 transition-all duration-300 group/item cursor-default"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-rose-600 rounded-l-xl opacity-80 group-hover/item:opacity-100 group-hover/item:w-1.5 transition-all"></div>
              
              <div className="pl-3 pr-4 flex flex-col items-center justify-center border-r border-gray-100">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-rose-600 font-black text-2xl leading-none group-hover/item:scale-110 transition-transform">{item.day}</span>
                <span className="text-gray-400 font-bold text-[9px] uppercase mt-1 tracking-widest">{item.month}</span>
              </div>
              
              <div className="pl-4 flex flex-col justify-center truncate w-full">
                <span className="text-gray-800 font-extrabold text-xs truncate group-hover/item:text-red-600 transition-colors" title={item.name}>{item.name}</span>
                <span className="text-gray-400 font-mono text-[9px] mt-0.5 truncate bg-gray-50 px-1.5 py-0.5 rounded w-fit" title={item.desc}>{item.desc}</span>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-500 text-sm font-medium">No birthdays found for {data.monthName || 'this month'}.</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Details */}
      <div 
        data-aos="fade-in" data-aos-delay="300"
        className="flex justify-between items-center text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-2"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          SOURCE • SIPL_Employees_contact_list.xlsx • Master Data
        </div>
        <div className="bg-gray-100 px-2 py-1 rounded-md">
          SHOWING ALL DEPLOYED
        </div>
      </div>
      
    </div>
  );
};

export default DashboardBirthday;
