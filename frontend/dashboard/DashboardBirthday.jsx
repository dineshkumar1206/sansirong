import config from '../src/config';
import React, { useState, useEffect } from 'react';

const DashboardBirthday = () => {
  const [data, setData] = useState({
    monthName: '',
    count: 0,
    birthdays: []
  });

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/birthdays`)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error('Failed to fetch birthdays', err));
  }, []);
  return (
    <div className="w-full font-sans px-8 md:px-16 pb-12 mt-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-600 rotate-45"></div>
        <h2 className="text-red-600 font-bold tracking-widest text-sm uppercase">
          Upcoming Birthdays
        </h2>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-red-400 p-6 mb-4">
        
        {/* Card Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-4 bg-red-600"></div>
            <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase">
              {data.monthName || 'Loading...'}
            </h3>
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {data.count}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 pl-3">
            Team birthdays — from OSS & office staff records
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {data.birthdays.length > 0 ? data.birthdays.map((item, index) => (
            <div key={index} className="bg-gray-50 border border-gray-100 rounded-lg flex items-center p-3 relative overflow-hidden hover:shadow-md transition-shadow">
              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-red-500 rounded-r-md"></div>
              
              <div className="pl-3 pr-4 flex flex-col items-center justify-center border-r border-gray-200">
                <span className="text-red-500 font-black text-xl leading-none">{item.day}</span>
                <span className="text-gray-400 font-bold text-[8px] uppercase mt-1 tracking-widest">{item.month}</span>
              </div>
              
              <div className="pl-4 flex flex-col justify-center truncate">
                <span className="text-gray-900 font-bold text-xs truncate" title={item.name}>{item.name}</span>
                <span className="text-gray-400 font-mono text-[9px] mt-0.5 truncate" title={item.desc}>{item.desc}</span>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-8 text-center text-gray-500 text-sm">
              No birthdays found for {data.monthName || 'this month'}.
            </div>
          )}
        </div>
      </div>

      {/* Footer Details */}
      <div className="flex justify-between items-center text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-1">
        <div>
          SOURCE • SIPL_Employees_contact_list.xlsx • Master Data
        </div>
        <div>
          SHOWING ALL 164 DEPLOYED
        </div>
      </div>
      
    </div>
  );
};

export default DashboardBirthday;
