import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Good', value: 30, color: '#16a34a' }, // green
  { name: 'Average', value: 20, color: '#0ea5e9' }, // blue
  { name: 'Low', value: 50, color: '#f77171' }, // light red/pink
];

const DashboardInterview = () => {
  return (
    <div className="w-full font-sans px-8 md:px-16 pb-12 mt-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-600 rotate-45"></div>
        <h2 className="text-red-600 font-bold tracking-widest text-sm uppercase">
          Interview Pipeline
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Card 1: Candidates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Candidates
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">In the interview list</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-[#d32f2f] italic mt-6">
            679
          </div>
        </div>

        {/* Card 2: Rated Good */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Rated Good
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">Strong technical fit</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-[#d32f2f] italic mt-6">
            7
          </div>
        </div>

        {/* Card 3: Joined */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Joined
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">Converted to hires</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-[#d32f2f] italic mt-6">
            19
          </div>
        </div>

        {/* Card 4: Tech Rating Mix */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-[2] flex flex-col">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Tech Rating Mix
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">Good / Avg / Low</p>
          </div>
          
          <div className="h-48 mt-4 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="30%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  iconType="square"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '10px', color: '#6b7280' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full Candidate List Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-1 h-4 bg-red-600"></div>
          <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase">
            Full Candidate List
          </h3>
        </div>
        <p className="text-[11px] text-gray-400 mb-6">
          All interview candidates with contact, rating, experience, salary & status
        </p>
        <button className="bg-[#6db921] hover:bg-[#5da01b] transition-colors text-black font-bold py-2.5 px-6 rounded-md shadow flex items-center gap-2 text-sm">
          <span>📋</span> Open Interview List
        </button>
      </div>
    </div>
  );
};

export default DashboardInterview;
