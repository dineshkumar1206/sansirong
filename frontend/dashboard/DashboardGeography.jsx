import React from 'react';
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
  // Card 1: Top Home Districts
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
    labels: ['Unknown', 'Cuddalore', 'Salem', 'Erode', 'Namakkal', 'Krishna', 'Tirunelveli', 'Krishnagiri', 'Ariyalur'],
    datasets: [{
      data: [12, 10, 10, 8, 6, 4, 4, 4, 3],
      backgroundColor: '#dc2626', // Red
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  // Card 2: Organisation Rollup (Doughnut)
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
      data: [136, 10, 0],
      backgroundColor: ['#dc2626', '#64748b', '#f59e0b'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  return (
    <div className="w-full px-8 md:px-16 pb-8 bg-[#f4f7f9] pt-8">
      
      <div className="mb-6 flex items-center">
        <h2 className="text-[#d32f2f] text-sm font-black tracking-widest uppercase flex items-center">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> GEOGRAPHY & ORGANISATION
        </h2>
        <div className="flex-grow h-px bg-red-100 ml-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Top Home Districts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[520px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> TOP HOME DISTRICTS
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              Where the workforce comes from (permanent district)
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={districtsData} options={districtsOptions} />
          </div>
        </div>

        {/* Card 2: Organisation Rollup */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[520px]">
          <div className="mb-6 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> ORGANISATION ROLLUP
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              Total Sansirong manpower across units
            </p>
          </div>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100 flex flex-col items-center justify-center">
              <div className="font-mono text-2xl font-black text-[#dc2626]">136</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">OSS</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100 flex flex-col items-center justify-center">
              <div className="font-mono text-2xl font-black text-[#64748b]">10</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">OFFICE</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100 flex flex-col items-center justify-center">
              <div className="font-mono text-2xl font-black text-[#f59e0b]">0</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">CEAT</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100 flex flex-col items-center justify-center">
              <div className="font-mono text-2xl font-black text-[#0ea5e9]">146</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">TOTAL</div>
            </div>
          </div>

          <div className="flex-grow w-full relative mb-4 min-h-[240px]">
            <Doughnut data={orgData} options={orgOptions} />
          </div>

          <div className="border-t border-gray-100 pt-4">
             <h4 className="text-gray-700 text-[10px] font-bold tracking-widest uppercase flex items-center mb-3">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#f59e0b] mr-2"></span> CEAT TEAM • 3
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-[10px] font-medium text-gray-700 border-l-2 border-l-[#f59e0b]">Munaf</span>
              <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-[10px] font-medium text-gray-700 border-l-2 border-l-[#f59e0b]">Manoj Sadhu</span>
              <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-[10px] font-medium text-gray-700 border-l-2 border-l-[#f59e0b]">Vikram Dass</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardGeography;
