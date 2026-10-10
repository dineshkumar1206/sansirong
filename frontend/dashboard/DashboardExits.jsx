import config from '../src/config';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Search } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashboardExits = () => {
  const [stats, setStats] = useState({
    totalExits: 0,
    avgTenure: 0,
    attritionRate: 0,
    exitsByVendorData: [],
    attritionRateData: [],
    tenureData: [],
    tableData: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    fetch(`${config.API_BASE_URL}/api/exits`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch exits data', err));
  }, []);

  const filteredTableData = stats.tableData.filter(row => {
    const term = searchTerm.toLowerCase();
    return (
      (row.name && row.name.toLowerCase().includes(term)) ||
      (row.vendor && row.vendor.toLowerCase().includes(term)) ||
      (row.site && row.site.toLowerCase().includes(term)) ||
      (row.reason && row.reason.toLowerCase().includes(term))
    );
  });

  return (
    <div className="w-full font-sans px-8 md:px-16 pb-12 mt-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6" data-aos="fade-down">
        <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-rose-600 rotate-45 shadow-sm shadow-red-500/50"></div>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 font-extrabold tracking-widest text-sm uppercase">
          Attrition & Exits
        </h2>
      </div>

      {/* Top Grid */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        
        {/* Total Exits & Avg Tenure */}
        <div 
          data-aos="fade-up" data-aos-delay="100"
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-1 gap-6 group hover:-translate-y-1"
        >
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
                <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase leading-tight group-hover:text-red-600 transition-colors">
                  Total<br/>Exits
                </h3>
              </div>
              <p className="text-[10px] text-gray-400 pl-3 leading-tight mt-1">Employees<br/>who have<br/>left</p>
            </div>
            <div className="font-mono tracking-tighter text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500 italic mt-6">
              {stats.totalExits}
            </div>
          </div>
          <div className="w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
                <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase leading-tight group-hover:text-red-600 transition-colors">
                  Avg<br/>Tenure
                </h3>
              </div>
              <p className="text-[10px] text-gray-400 pl-3 leading-tight mt-1">Months before<br/>leaving</p>
            </div>
            <div className="font-mono tracking-tighter text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500 italic mt-6">
              {stats.avgTenure}
            </div>
          </div>
        </div>

        {/* Attrition Rate */}
        <div 
          data-aos="fade-up" data-aos-delay="200"
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex-1 flex flex-col justify-between group hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
              <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase leading-tight group-hover:text-red-600 transition-colors">
                Attrition<br/>Rate
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3 leading-tight mt-1">Exits vs total<br/>workforce</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500 italic mt-6 flex items-baseline">
            {stats.attritionRate}<span className="text-2xl ml-1 text-red-400">%</span>
          </div>
        </div>

        {/* Exits By Vendor Chart */}
        <div 
          data-aos="fade-up" data-aos-delay="300"
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex-[1.5] flex flex-col group hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
              <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase group-hover:text-red-600 transition-colors">
                Exits By Vendor
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">Where attrition concentrates</p>
          </div>
          <div className="h-40 mt-4 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.exitsByVendorData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280', fontWeight: 'bold' }} width={60} />
                <Bar dataKey="value" fill="url(#colorVendor)" radius={[0, 4, 4, 0]} barSize={8} className="cursor-pointer hover:opacity-80 transition-opacity">
                   <Cell fill="#ef4444" />
                </Bar>
                <defs>
                  <linearGradient id="colorVendor" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition Rate By Vendor Chart */}
        <div 
          data-aos="fade-up" data-aos-delay="400"
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex-[1.5] flex flex-col group hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
              <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase group-hover:text-red-600 transition-colors">
                Attrition Rate By Vendor
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">Retention risk per supplier</p>
          </div>
          <div className="h-40 mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.attritionRateData} margin={{ top: 10, right: 0, left: -20, bottom: 20 }}>
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9ca3af' }} tickFormatter={(val) => `${val}%`} ticks={[0, 20, 40, 60, 80, 100]} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#6b7280', angle: -45, textAnchor: 'end', dy: 5, fontWeight: 'bold' }} interval={0} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={12} className="cursor-pointer hover:opacity-80 transition-opacity">
                  {stats.attritionRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tenure At Exit Chart */}
        <div 
          data-aos="fade-up" data-aos-delay="500"
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex-[1.5] flex flex-col group hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
              <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase group-hover:text-red-600 transition-colors">
                Tenure At Exit
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">How long people stay before leaving</p>
          </div>
          <div className="h-40 mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.tenureData} margin={{ top: 10, right: 0, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorTenure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9ca3af' }} ticks={[0, 5, 10, 15, 20, 25, 30]} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 'bold' }} />
                <Bar dataKey="value" fill="url(#colorTenure)" radius={[4, 4, 0, 0]} barSize={24} className="cursor-pointer hover:opacity-80 transition-opacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Exit Register */}
      <div 
        data-aos="fade-up" data-aos-delay="600"
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden"
      >
        
        {/* Header & Search */}
        <div className="p-6 border-b border-gray-100 bg-white/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
                <h3 className="font-black text-gray-800 tracking-wider text-sm uppercase">
                  Exit Register
                </h3>
              </div>
              <p className="text-xs text-gray-400 pl-3">
                Search by name, vendor, site or reason
              </p>
            </div>
            
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 focus:bg-white transition-all shadow-sm" 
                placeholder="Search exited employees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-200">
          <table className="w-full text-left border-collapse relative">
            <thead className="sticky top-0 z-10 bg-slate-900 shadow-md">
              <tr className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4 rounded-tl-lg">Name</th>
                <th className="px-4 py-4">Vendor</th>
                <th className="px-4 py-4">Site</th>
                <th className="px-4 py-4 text-center">Joined</th>
                <th className="px-4 py-4 text-center">Left</th>
                <th className="px-4 py-4 text-center">Tenure</th>
                <th className="px-4 py-4 text-center">Last Cert</th>
                <th className="px-6 py-4 rounded-tr-lg">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700 bg-white/50">
              {filteredTableData.length > 0 ? filteredTableData.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-red-50/50 transition-colors group cursor-default"
                >
                  <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-red-600 transition-colors">{row.name}</td>
                  <td className="px-4 py-4"><span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600">{row.vendor}</span></td>
                  <td className="px-4 py-4">{row.site}</td>
                  <td className="px-4 py-4 text-center text-gray-500">{row.joined}</td>
                  <td className="px-4 py-4 text-center text-gray-500">{row.left}</td>
                  <td className="px-4 py-4 text-center font-mono text-[11px] text-red-500 font-bold bg-red-50/30">{row.tenure}</td>
                  <td className="px-4 py-4 text-center">
                    {row.cert !== '—' ? (
                      <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md font-bold text-[10px] border border-indigo-100">{row.cert}</span>
                    ) : (
                      <span className="text-gray-400">{row.cert}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={row.reason}>{row.reason}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-400 bg-white/50 flex flex-col items-center justify-center">
                    <Search className="h-8 w-8 text-gray-300 mb-2" />
                    No exited employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardExits;
