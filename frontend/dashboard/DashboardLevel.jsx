import config from '../src/config';
import React, { useState, useEffect } from 'react';

const DashboardLevel = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/employees`);
        if (res.ok) {
          const data = await res.json();
          setEmployees(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const total = employees.length;
  const l0Count = Math.floor(total * 0.1);
  const l1Count = Math.floor(total * 0.4);
  const l2Count = Math.floor(total * 0.4);
  
  const l0 = employees.slice(0, l0Count);
  const l1 = employees.slice(l0Count, l0Count + l1Count);
  const l2 = employees.slice(l0Count + l1Count, l0Count + l1Count + l2Count);
  const l3 = employees.slice(l0Count + l1Count + l2Count);

  const getPct = (arr) => total > 0 ? Math.round((arr.length / total) * 100) : 0;

  const renderRoster = (arr, hoverColor) => {
    return arr.map((item, i) => (
      <div 
        key={i} 
        className={`mb-3 p-3 rounded-lg border border-transparent hover:border-gray-100 bg-white hover:${hoverColor} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group/item cursor-default`}
      >
        <div className="text-xs font-bold text-gray-900 group-hover/item:text-gray-900 transition-colors">{item.name || '-'}</div>
        <div className="text-[9px] font-mono text-gray-500 mt-1 flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 group-hover/item:bg-white transition-colors">{item.cm_site || 'N/A'}</span> 
          <span className="text-gray-300">•</span> 
          <span className="text-gray-600 font-semibold">{item.vendor || 'N/A'}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full px-8 md:px-16 pb-12 mt-8 font-sans">
      <div className="flex items-center mb-4" data-aos="fade-right">
        <h2 className="text-[#d32f2f] text-xs font-extrabold tracking-widest uppercase flex items-center">
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2 shadow-sm"></span> SKILL LEVEL ROSTER • NAMES
        </h2>
      </div>

      <div 
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden p-6 relative"
        data-aos="fade-up"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
        
        <div className="mb-8">
          <div className="flex items-center">
             <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-red-700 mr-2 rounded-full"></div>
             <h3 className="text-gray-900 text-sm font-black tracking-widest uppercase flex items-center">
               ENGINEERS BY SKILL LEVEL
             </h3>
          </div>
          <p className="text-gray-400 text-[10px] font-medium mt-2 ml-3">
            Named roster proportionally distributed based on total headcount
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* L0 Container */}
          <div 
            className="bg-amber-50/30 rounded-2xl border border-amber-50 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 flex flex-col h-[420px] relative overflow-hidden group/card"
            data-aos="fade-up" data-aos-delay="100"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="p-5 border-b border-amber-100/60 flex justify-between items-center bg-white/60 backdrop-blur-sm z-10">
               <div>
                 <h4 className="text-amber-600 text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5">
                   L0 <span className="font-bold text-amber-400/70 text-[9px]">TRAINEE</span>
                 </h4>
               </div>
               <div className="bg-white border border-amber-200 rounded-full px-3 py-1 text-[9px] font-mono font-bold text-amber-700 shadow-sm">
                  {l0.length} <span className="text-amber-300 mx-1">•</span> {getPct(l0)}%
               </div>
            </div>
            <div className="p-3 overflow-y-auto custom-scrollbar flex-1 relative z-0">
              {renderRoster(l0, 'bg-amber-50/50')}
            </div>
          </div>

          {/* L1 Container */}
          <div 
            className="bg-emerald-50/30 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col h-[420px] relative overflow-hidden group/card"
            data-aos="fade-up" data-aos-delay="200"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="p-5 border-b border-emerald-100/60 flex justify-between items-center bg-white/60 backdrop-blur-sm z-10">
               <div>
                 <h4 className="text-emerald-600 text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5">
                   L1 <span className="font-bold text-emerald-400/70 text-[9px]">BASIC</span>
                 </h4>
               </div>
               <div className="bg-white border border-emerald-200 rounded-full px-3 py-1 text-[9px] font-mono font-bold text-emerald-700 shadow-sm">
                  {l1.length} <span className="text-emerald-300 mx-1">•</span> {getPct(l1)}%
               </div>
            </div>
            <div className="p-3 overflow-y-auto custom-scrollbar flex-1 relative z-0">
              {renderRoster(l1, 'bg-emerald-50/50')}
            </div>
          </div>

          {/* L2 Container */}
          <div 
            className="bg-blue-50/30 rounded-2xl border border-blue-50 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-[420px] relative overflow-hidden group/card"
            data-aos="fade-up" data-aos-delay="300"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-sky-400 opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="p-5 border-b border-blue-100/60 flex justify-between items-center bg-white/60 backdrop-blur-sm z-10">
               <div>
                 <h4 className="text-blue-600 text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5">
                   L2 <span className="font-bold text-blue-400/70 text-[9px]">SKILLED</span>
                 </h4>
               </div>
               <div className="bg-white border border-blue-200 rounded-full px-3 py-1 text-[9px] font-mono font-bold text-blue-700 shadow-sm">
                  {l2.length} <span className="text-blue-300 mx-1">•</span> {getPct(l2)}%
               </div>
            </div>
            <div className="p-3 overflow-y-auto custom-scrollbar flex-1 relative z-0">
              {renderRoster(l2, 'bg-blue-50/50')}
            </div>
          </div>

          {/* L3 Container */}
          <div 
            className="bg-red-50/30 rounded-2xl border border-red-50 shadow-sm hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 flex flex-col h-[420px] relative overflow-hidden group/card"
            data-aos="fade-up" data-aos-delay="400"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="p-5 border-b border-red-100/60 flex justify-between items-center bg-white/60 backdrop-blur-sm z-10">
               <div>
                 <h4 className="text-red-600 text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5">
                   L3 <span className="font-bold text-red-400/70 text-[9px]">EXPERT</span>
                 </h4>
               </div>
               <div className="bg-white border border-red-200 rounded-full px-3 py-1 text-[9px] font-mono font-bold text-red-700 shadow-sm">
                  {l3.length} <span className="text-red-300 mx-1">•</span> {getPct(l3)}%
               </div>
            </div>
            <div className="p-3 overflow-y-auto custom-scrollbar flex-1 relative z-0">
              {renderRoster(l3, 'bg-red-50/50')}
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
};

export default DashboardLevel;
