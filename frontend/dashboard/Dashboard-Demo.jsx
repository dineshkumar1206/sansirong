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

const DashboardDemo = () => {
  // Chart 1: Age Profile
  const ageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false } },
      x: { grid: { display: false }, border: { display: false } }
    }
  };
  const ageData = {
    labels: ['19-21', '22-24', '25-27', '28+'],
    datasets: [{ data: [11, 80, 38, 19], backgroundColor: '#22c55e', borderRadius: 4, barPercentage: 0.6 }]
  };

  // Chart 2: Qualification
  const qualOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, font: { size: 10 } } },
    },
    cutout: '60%'
  };
  const qualData = {
    labels: ['Engineering (UG)', 'Diploma', 'Other', 'Other Degree', 'Post Graduate'],
    datasets: [{
      data: [60, 15, 10, 2, 1],
      backgroundColor: ['#dc2626', '#0ea5e9', '#64748b', '#f59e0b', '#22c55e'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  // Chart 3: Blood Group Registry
  const bloodOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false } },
      x: { grid: { display: false }, border: { display: false } }
    }
  };
  const bloodData = {
    labels: ['O+', 'B+', 'A+', 'Unknown', 'AB+', 'O-', 'AB-', 'A-'],
    datasets: [{ data: [58, 46, 30, 12, 10, 2, 1, 1], backgroundColor: '#d97706', borderRadius: 4, barPercentage: 0.6 }]
  };

  // Chart 4: Accommodation
  const accOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false } },
      y: { grid: { display: false }, border: { display: false } }
    }
  };
  const accData = {
    labels: ['PG / Hostel', 'Own / Home', 'Unspecified', 'Other', 'Company Room', 'Rental'],
    datasets: [{ data: [100, 30, 12, 10, 2, 1], backgroundColor: '#8b5cf6', borderRadius: 4, barPercentage: 0.6 }]
  };

  // Chart 5: Faith Mix
  const faithOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, font: { size: 10 } } },
    },
    cutout: '60%'
  };
  const faithData = {
    labels: ['Hindu', 'Other', 'Muslim', 'Christian'],
    datasets: [{
      data: [75, 15, 8, 2],
      backgroundColor: ['#dc2626', '#64748b', '#0ea5e9', '#f59e0b'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  // Chart 6: Department Function
  const deptOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false } },
      y: { grid: { display: false }, border: { display: false } }
    }
  };
  const deptData = {
    labels: ['Fatp', 'Oss', 'Unspecified', 'Post Lipo', 'Mlb', 'Automation', 'Asm'],
    datasets: [{ data: [45, 25, 24, 12, 10, 10, 8], backgroundColor: '#0ea5e9', borderRadius: 4, barPercentage: 0.6 }]
  };

  return (
    <div className="w-full px-8 md:px-16 pb-8 bg-[#f4f7f9] pt-8">
      
      <div className="mb-6">
        <h2 className="text-[#d32f2f] text-sm font-black tracking-widest uppercase flex items-center">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> DEMOGRAPHICS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> AGE PROFILE
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              A young, early-career workforce
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={ageData} options={ageOptions} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> QUALIFICATION
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              Education background of engineers
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Doughnut data={qualData} options={qualOptions} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> BLOOD GROUP REGISTRY
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              Emergency medical reference
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={bloodData} options={bloodOptions} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> ACCOMMODATION
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              Stay category of deployed staff
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={accData} options={accOptions} />
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> FAITH MIX
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              Social composition
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Doughnut data={faithData} options={faithOptions} />
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> DEPARTMENT FUNCTION
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3">
              Functional assignment
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={deptData} options={deptOptions} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardDemo;
