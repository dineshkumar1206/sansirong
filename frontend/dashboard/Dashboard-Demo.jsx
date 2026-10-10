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

const DashboardDemo = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/employees`)
      .then(res => res.json())
      .then(data => setEmployees(data || []))
      .catch(err => console.error(err));
  }, []);

  const countBy = (arr, key, normalizer = x => x) => {
    return arr.reduce((acc, curr) => {
      let val = normalizer(curr[key]);
      if (!val || val.trim() === '') val = 'Unknown';
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  };

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
  const ageBuckets = { '19-21': 0, '22-24': 0, '25-27': 0, '28+': 0, 'Unknown': 0 };
  employees.forEach(emp => {
    const age = parseFloat(emp.age);
    if (!isNaN(age)) {
      if (age >= 19 && age <= 21) ageBuckets['19-21']++;
      else if (age >= 22 && age <= 24) ageBuckets['22-24']++;
      else if (age >= 25 && age <= 27) ageBuckets['25-27']++;
      else if (age >= 28) ageBuckets['28+']++;
      else ageBuckets['Unknown']++;
    } else {
      ageBuckets['Unknown']++;
    }
  });
  const ageData = {
    labels: ['19-21', '22-24', '25-27', '28+', 'Unknown'],
    datasets: [{ data: Object.values(ageBuckets), backgroundColor: '#22c55e', borderRadius: 4, barPercentage: 0.6 }]
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
  const qualCounts = countBy(employees, 'qualification', x => {
    if (!x) return 'Unknown';
    const s = x.toLowerCase();
    if (s.includes('b.tech') || s.includes('b.e') || s.includes('engineering') || s.includes('ug')) return 'Engineering (UG)';
    if (s.includes('diploma') || s.includes('polytechnic')) return 'Diploma';
    if (s.includes('m.tech') || s.includes('m.e') || s.includes('pg') || s.includes('post')) return 'Post Graduate';
    if (s.includes('bsc') || s.includes('b.sc') || s.includes('bcom') || s.includes('ba')) return 'Other Degree';
    return 'Other';
  });
  const qualLabels = ['Engineering (UG)', 'Diploma', 'Other Degree', 'Post Graduate', 'Other', 'Unknown'];
  const qualDataArr = qualLabels.map(l => qualCounts[l] || 0);
  const qualData = {
    labels: qualLabels,
    datasets: [{
      data: qualDataArr,
      backgroundColor: ['#dc2626', '#0ea5e9', '#f59e0b', '#22c55e', '#64748b', '#cbd5e1'],
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
  const bloodCounts = countBy(employees, 'blood_group', x => x ? x.toUpperCase().replace(/\s+/g, '') : 'Unknown');
  const sortedBlood = Object.entries(bloodCounts).sort((a, b) => b[1] - a[1]);
  const bloodData = {
    labels: sortedBlood.map(e => e[0]),
    datasets: [{ data: sortedBlood.map(e => e[1]), backgroundColor: '#d97706', borderRadius: 4, barPercentage: 0.6 }]
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
  const accCounts = countBy(employees, 'stay_category', x => {
    if(!x) return 'Unspecified';
    const s = x.toLowerCase();
    if(s.includes('pg') || s.includes('hostel')) return 'PG / Hostel';
    if(s.includes('own') || s.includes('home')) return 'Own / Home';
    if(s.includes('company')) return 'Company Room';
    if(s.includes('rent')) return 'Rental';
    return 'Other';
  });
  const sortedAcc = Object.entries(accCounts).sort((a, b) => b[1] - a[1]);
  const accData = {
    labels: sortedAcc.map(e => e[0]),
    datasets: [{ data: sortedAcc.map(e => e[1]), backgroundColor: '#8b5cf6', borderRadius: 4, barPercentage: 0.6 }]
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
  const faithCounts = countBy(employees, 'religion', x => {
    if(!x) return 'Unknown';
    const s = x.toLowerCase();
    if(s.includes('hindu')) return 'Hindu';
    if(s.includes('muslim') || s.includes('islam')) return 'Muslim';
    if(s.includes('christian')) return 'Christian';
    return 'Other';
  });
  const faithLabels = ['Hindu', 'Muslim', 'Christian', 'Other', 'Unknown'];
  const faithDataArr = faithLabels.map(l => faithCounts[l] || 0).filter(v => v > 0);
  const activeFaithLabels = faithLabels.filter(l => (faithCounts[l] || 0) > 0);
  const faithData = {
    labels: activeFaithLabels,
    datasets: [{
      data: faithDataArr,
      backgroundColor: ['#dc2626', '#0ea5e9', '#f59e0b', '#64748b', '#cbd5e1'],
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
  const deptCounts = countBy(employees, 'department', x => {
    if(!x) return 'Unspecified';
    return x.trim().toUpperCase();
  });
  const sortedDept = Object.entries(deptCounts).sort((a, b) => b[1] - a[1]);
  const deptData = {
    labels: sortedDept.map(e => e[0]),
    datasets: [{ data: sortedDept.map(e => e[1]), backgroundColor: '#0ea5e9', borderRadius: 4, barPercentage: 0.6 }]
  };

  return (
    <div className="w-full px-8 md:px-16 pb-8 bg-[#f4f7f9] pt-8">
      
      <div className="mb-6 flex items-center" data-aos="fade-right">
        <h2 className="text-[#d32f2f] text-sm font-black tracking-widest uppercase flex items-center">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2 shadow-sm"></span> DEMOGRAPHICS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div 
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[350px] relative overflow-hidden"
          data-aos="fade-up" data-aos-delay="100"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-emerald-500 mr-2 rounded-full"></span> AGE PROFILE
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
              A young, early-career workforce
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={ageData} options={ageOptions} />
          </div>
        </div>

        {/* Card 2 */}
        <div 
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[350px] relative overflow-hidden"
          data-aos="fade-up" data-aos-delay="200"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-sky-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-blue-500 mr-2 rounded-full"></span> QUALIFICATION
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
              Education background of engineers
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Doughnut data={qualData} options={qualOptions} />
          </div>
        </div>

        {/* Card 3 */}
        <div 
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[350px] relative overflow-hidden"
          data-aos="fade-up" data-aos-delay="300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-amber-500 mr-2 rounded-full"></span> BLOOD GROUP REGISTRY
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
              Emergency medical reference
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={bloodData} options={bloodOptions} />
          </div>
        </div>

        {/* Card 4 */}
        <div 
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[350px] relative overflow-hidden"
          data-aos="fade-up" data-aos-delay="100"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-purple-500 mr-2 rounded-full"></span> ACCOMMODATION
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
              Stay category of deployed staff
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={accData} options={accOptions} />
          </div>
        </div>

        {/* Card 5 */}
        <div 
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[350px] relative overflow-hidden"
          data-aos="fade-up" data-aos-delay="200"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-rose-500 mr-2 rounded-full"></span> FAITH MIX
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
              Social composition
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Doughnut data={faithData} options={faithOptions} />
          </div>
        </div>

        {/* Card 6 */}
        <div 
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-[350px] relative overflow-hidden"
          data-aos="fade-up" data-aos-delay="300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-3 bg-sky-500 mr-2 rounded-full"></span> DEPARTMENT FUNCTION
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3.5 group-hover:text-gray-700 transition-colors">
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
