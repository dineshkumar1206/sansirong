import config from '../src/config';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Search } from 'lucide-react'; // assuming lucide-react is used or I'll just use an SVG for search

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
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-600 rotate-45"></div>
        <h2 className="text-red-600 font-bold tracking-widest text-sm uppercase">
          Attrition & Exits
        </h2>
      </div>

      {/* Top Grid */}
      <div className="flex flex-col xl:flex-row gap-4 mb-4">
        
        {/* Total Exits & Avg Tenure */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-1 gap-6">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-3 bg-red-600"></div>
                <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase leading-tight">
                  Total<br/>Exits
                </h3>
              </div>
              <p className="text-[10px] text-gray-400 pl-3 leading-tight mt-1">Employees<br/>who have<br/>left</p>
            </div>
            <div className="font-mono tracking-tighter text-5xl font-black text-red-400 italic mt-6">
              {stats.totalExits}
            </div>
          </div>
          <div className="w-[1px] bg-gray-100"></div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-3 bg-red-600"></div>
                <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase leading-tight">
                  Avg<br/>Tenure
                </h3>
              </div>
              <p className="text-[10px] text-gray-400 pl-3 leading-tight mt-1">Months before<br/>leaving</p>
            </div>
            <div className="font-mono tracking-tighter text-5xl font-black text-red-400 italic mt-6">
              {stats.avgTenure}
            </div>
          </div>
        </div>

        {/* Attrition Rate */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase leading-tight">
                Attrition<br/>Rate
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3 leading-tight mt-1">Exits vs total<br/>workforce</p>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-red-400 italic mt-6 flex items-baseline">
            {stats.attritionRate}<span className="text-2xl ml-1">%</span>
          </div>
        </div>

        {/* Exits By Vendor Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-[1.5] flex flex-col">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase">
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
                <Bar dataKey="value" fill="#d32f2f" radius={[0, 4, 4, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition Rate By Vendor Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-[1.5] flex flex-col">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase">
                Attrition Rate By Vendor
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">Exits ÷ (active + exits) — retention risk per supplier</p>
          </div>
          <div className="h-40 mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.attritionRateData} margin={{ top: 10, right: 0, left: -20, bottom: 20 }}>
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9ca3af' }} tickFormatter={(val) => `${val}%`} ticks={[0, 20, 40, 60, 80, 100]} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#6b7280', angle: -45, textAnchor: 'end', dy: 5, fontWeight: 'bold' }} interval={0} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={12}>
                  {stats.attritionRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tenure At Exit Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-[1.5] flex flex-col">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-3 bg-red-600"></div>
              <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase">
                Tenure At Exit
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 pl-3">How long people stay before leaving</p>
          </div>
          <div className="h-40 mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.tenureData} margin={{ top: 10, right: 0, left: -20, bottom: 5 }}>
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9ca3af' }} ticks={[0, 5, 10, 15, 20, 25, 30]} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 'bold' }} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Exit Register */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header & Search */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-4 bg-red-600"></div>
                <h3 className="font-black text-gray-900 tracking-wider text-sm uppercase">
                  Exit Register
                </h3>
              </div>
              <p className="text-xs text-gray-400 pl-3">
                Search by name, vendor, site or reason
              </p>
            </div>
            
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" 
                placeholder="Search exited employees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="w-full text-left border-collapse relative">
            <thead className="sticky top-0 z-10 bg-[#0f172a] shadow-sm">
              <tr className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-3">Name</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Site</th>
                <th className="px-4 py-3 text-center">Joined</th>
                <th className="px-4 py-3 text-center">Left</th>
                <th className="px-4 py-3 text-center">Tenure</th>
                <th className="px-4 py-3 text-center">Last Cert</th>
                <th className="px-6 py-3">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700 bg-white">
              {filteredTableData.length > 0 ? filteredTableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{row.name}</td>
                  <td className="px-4 py-4">{row.vendor}</td>
                  <td className="px-4 py-4">{row.site}</td>
                  <td className="px-4 py-4 text-center text-gray-500">{row.joined}</td>
                  <td className="px-4 py-4 text-center text-gray-500">{row.left}</td>
                  <td className="px-4 py-4 text-center font-mono text-[11px] text-gray-500">{row.tenure}</td>
                  <td className="px-4 py-4 text-center">
                    {row.cert !== '—' ? (
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold text-[10px]">{row.cert}</span>
                    ) : (
                      <span className="text-gray-400">{row.cert}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{row.reason}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500 bg-white">
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
