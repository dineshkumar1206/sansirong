import config from '../src/config';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import InterviewListModal from './InterviewListModal';

const DashboardInterview = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    ratedGood: 0,
    joined: 0,
    techRatingMix: { good: 0, average: 0, low: 0 }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const data = [
    { name: 'Good', value: stats.techRatingMix.good || 0.1, color: '#16a34a' }, // green
    { name: 'Average', value: stats.techRatingMix.average || 0.1, color: '#0ea5e9' }, // blue
    { name: 'Low', value: stats.techRatingMix.low || 0.1, color: '#f77171' }, // light red/pink
  ];

  return (
    <div className="w-full font-sans px-8 md:px-16 pb-12 mt-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6" data-aos="fade-right">
        <div className="w-1.5 h-1.5 bg-red-600 rotate-45 shadow-sm"></div>
        <h2 className="text-red-600 font-black tracking-widest text-sm uppercase">
          Interview Pipeline
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Card 1: Candidates */}
        <div 
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden cursor-default"
          data-aos="fade-up" data-aos-delay="100"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-3 bg-red-500 rounded-full"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Candidates
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3.5 group-hover:text-gray-600 transition-colors">In the interview list</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-[#d32f2f] italic mt-6 group-hover:scale-105 transform origin-left transition-transform duration-300">
            {stats.totalCandidates}
          </div>
        </div>

        {/* Card 2: Rated Good */}
        <div 
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden cursor-default"
          data-aos="fade-up" data-aos-delay="200"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-3 bg-emerald-500 rounded-full"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Rated Good
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3.5 group-hover:text-gray-600 transition-colors">Strong technical fit</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-emerald-600 italic mt-6 group-hover:scale-105 transform origin-left transition-transform duration-300">
            {stats.ratedGood}
          </div>
        </div>

        {/* Card 3: Joined */}
        <div 
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden cursor-default"
          data-aos="fade-up" data-aos-delay="300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Joined
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3.5 group-hover:text-gray-600 transition-colors">Converted to hires</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-blue-600 italic mt-6 group-hover:scale-105 transform origin-left transition-transform duration-300">
            {stats.joined}
          </div>
        </div>

        {/* Card 4: Tech Rating Mix */}
        <div 
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-[2] flex flex-col hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden"
          data-aos="fade-up" data-aos-delay="400"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-3 bg-purple-500 rounded-full"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-xs uppercase">
                Tech Rating Mix
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3.5 group-hover:text-gray-600 transition-colors">Good / Avg / Low</p>
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
                  wrapperStyle={{ fontSize: '10px', color: '#6b7280', fontWeight: '600' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full Candidate List Banner */}
      <div 
        className="group bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center hover:shadow-xl hover:border-red-200 transition-all duration-500 relative overflow-hidden"
        data-aos="fade-up" data-aos-delay="500"
      >
        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="flex items-center justify-center gap-2 mb-1 relative z-10">
          <div className="w-1.5 h-4 bg-red-600 rounded-full"></div>
          <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase">
            Full Candidate List
          </h3>
        </div>
        <p className="text-[11px] text-gray-500 mb-6 relative z-10 font-medium">
          All interview candidates with contact, rating, experience, salary & status
        </p>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="relative overflow-hidden group/btn bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-8 rounded-xl shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all duration-300 flex items-center gap-2 text-sm z-10"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            <span className="group-hover/btn:rotate-12 transition-transform">📋</span> Open Interview List
          </span>
        </button>
      </div>
      <InterviewListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} stats={stats} />
    </div>
  );
};

export default DashboardInterview;
