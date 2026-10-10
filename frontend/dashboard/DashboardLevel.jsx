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

  const renderRoster = (arr) => {
    return arr.map((item, i) => (
      <div key={i} className="mb-4 last:mb-0">
        <div className="text-xs font-bold text-gray-900">{item.name || '-'}</div>
        <div className="text-[9px] font-mono text-gray-500 mt-0.5">
          {item.cm_site || 'N/A'} • {item.vendor || 'N/A'}
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full px-8 md:px-16 pb-12 mt-8">
      <div className="flex items-center mb-2">
        <h2 className="text-[#d32f2f] text-xs font-extrabold tracking-widest uppercase flex items-center">
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> SKILL LEVEL ROSTER • NAMES
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-[#d32f2f] shadow-sm overflow-hidden p-6">
        
        <div className="mb-6">
          <div className="flex items-center">
             <div className="w-1 h-4 bg-[#d32f2f] mr-2"></div>
             <h3 className="text-gray-900 text-sm font-black tracking-widest uppercase">
               ENGINEERS BY SKILL LEVEL
             </h3>
          </div>
          <p className="text-gray-400 text-[10px] font-medium mt-1 ml-3">
            Named roster proportionally distributed based on total headcount
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* L0 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
               <h4 className="text-gray-400 text-[11px] font-black tracking-widest uppercase">L0 <span className="font-bold text-gray-500">TRAINEE</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  {l0.length} • {getPct(l0)}%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {renderRoster(l0)}
            </div>
          </div>

          {/* L1 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
               <h4 className="text-gray-400 text-[11px] font-black tracking-widest uppercase">L1 <span className="font-bold text-gray-500">BASIC</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  {l1.length} • {getPct(l1)}%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {renderRoster(l1)}
            </div>
          </div>

          {/* L2 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#29b6f6]"></div>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center mt-1">
               <h4 className="text-[#29b6f6] text-[11px] font-black tracking-widest uppercase">L2 <span className="font-bold text-gray-500">SKILLED</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  {l2.length} • {getPct(l2)}%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {renderRoster(l2)}
            </div>
          </div>

          {/* L3 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#d32f2f]"></div>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center mt-1">
               <h4 className="text-[#d32f2f] text-[11px] font-black tracking-widest uppercase">L3 <span className="font-bold text-gray-500">EXPERT</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  {l3.length} • {getPct(l3)}%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {renderRoster(l3)}
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
          background: #e2e8f0; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1; 
        }
      `}</style>
    </div>
  );
};

export default DashboardLevel;
