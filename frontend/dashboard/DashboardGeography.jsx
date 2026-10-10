import config from '../src/config';
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardGeography = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/employees`)
      .then(res => res.json())
      .then(data => setEmployees(data || []))
      .catch(err => console.error(err));
  }, []);

  // 1. Top Home Districts
  const districtCounts = {};
  employees.forEach(emp => {
    let dist = emp.permanent_district || emp.present_district;
    if (!dist || dist.trim() === '') dist = 'Unknown';
    else dist = dist.trim().toUpperCase();
    districtCounts[dist] = (districtCounts[dist] || 0) + 1;
  });

  const sortedDistricts = Object.entries(districtCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  
  const districtsOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false } },
      y: { grid: { display: false }, border: { display: false } }
    }
  };
  const districtsData = {
    labels: sortedDistricts.map(d => d[0]),
    datasets: [{
      data: sortedDistricts.map(d => d[1]),
      backgroundColor: '#dc2626',
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  // 2. Organisation Rollup
  let ossCount = 0;
  let officeCount = 0;
  const ceatTeam = [];

  employees.forEach(emp => {
    const site = (emp.cm_site || '').toLowerCase();
    const dept = (emp.department || '').toLowerCase();
    const vendor = (emp.vendor || '').toLowerCase();
    
    if (site.includes('ceat') || vendor.includes('ceat')) {
      ceatTeam.push(emp.name);
    } else if (dept.includes('office') || dept.includes('hr') || dept.includes('admin') || vendor.includes('tehr')) {
      officeCount++;
    } else {
      ossCount++;
    }
  });

  const totalManpower = employees.length;
  const ceatCount = ceatTeam.length;

  const orgOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0
    },
    plugins: {
      legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, font: { size: 10 } } },
    },
    cutout: '55%',
    radius: '95%'
  };
  const orgData = {
    labels: ['OSS', 'Office', 'CEAT'],
    datasets: [{
      data: [ossCount, officeCount, ceatCount],
      backgroundColor: ['#dc2626', '#64748b', '#f59e0b'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  return (
    <div className="w-full px-8 md:px-16 pb-8 bg-[#f4f7f9] pt-8 font-sans">
      
      <div className="mb-8 flex items-center" data-aos="fade-right">
        <h2 className="text-[#d32f2f] text-sm font-black tracking-widest uppercase flex items-center">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2 shadow-sm"></span> GEOGRAPHY & ORGANISATION
        </h2>
        <div className="flex-grow h-px bg-gradient-to-r from-red-100 to-transparent ml-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Top Home Districts */}
        <div 
           className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[520px] relative overflow-hidden"
           data-aos="fade-up" data-aos-delay="100"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-red-500 mr-2 rounded-full"></span> TOP HOME DISTRICTS
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
              Where the workforce comes from (permanent district)
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={districtsData} options={districtsOptions} />
          </div>
        </div>

        {/* Card 2: Organisation Rollup */}
        <div 
           className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[520px] relative overflow-hidden"
           data-aos="fade-up" data-aos-delay="200"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-500 to-slate-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          
          <div className="mb-6 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-slate-500 mr-2 rounded-full"></span> ORGANISATION ROLLUP
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
              Total Sansirong manpower across units
            </p>
          </div>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-gray-50/50 hover:bg-red-50/50 transition-colors rounded-xl p-3 text-center border border-gray-100 flex flex-col items-center justify-center group/kpi cursor-default">
              <div className="font-mono text-2xl font-black text-[#dc2626] group-hover/kpi:scale-110 transition-transform duration-300">{ossCount}</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">OSS</div>
            </div>
            <div className="bg-gray-50/50 hover:bg-slate-100/50 transition-colors rounded-xl p-3 text-center border border-gray-100 flex flex-col items-center justify-center group/kpi cursor-default">
              <div className="font-mono text-2xl font-black text-[#64748b] group-hover/kpi:scale-110 transition-transform duration-300">{officeCount}</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">OFFICE</div>
            </div>
            <div className="bg-gray-50/50 hover:bg-amber-50/50 transition-colors rounded-xl p-3 text-center border border-gray-100 flex flex-col items-center justify-center group/kpi cursor-default">
              <div className="font-mono text-2xl font-black text-[#f59e0b] group-hover/kpi:scale-110 transition-transform duration-300">{ceatCount}</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">CEAT</div>
            </div>
            <div className="bg-gray-50/50 hover:bg-sky-50/50 transition-colors rounded-xl p-3 text-center border border-gray-100 flex flex-col items-center justify-center group/kpi cursor-default">
              <div className="font-mono text-2xl font-black text-[#0ea5e9] group-hover/kpi:scale-110 transition-transform duration-300">{totalManpower}</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">TOTAL</div>
            </div>
          </div>

          <div className="flex-grow w-full relative mb-4 min-h-[240px]">
            <Doughnut data={orgData} options={orgOptions} />
          </div>

          {ceatTeam.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
               <h4 className="text-gray-700 text-[10px] font-bold tracking-widest uppercase flex items-center mb-3">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#f59e0b] mr-2"></span> CEAT TEAM • {ceatCount}
              </h4>
              <div className="flex flex-wrap gap-2">
                {ceatTeam.map((name, i) => (
                  <span key={i} className="px-3 py-1 bg-white hover:bg-amber-50 hover:-translate-y-0.5 transition-all border border-gray-200 rounded-md text-[10px] font-medium text-gray-700 border-l-2 border-l-[#f59e0b] cursor-default shadow-sm hover:shadow">{name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardGeography;
