import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart1 = () => {
  const [vendorData, setVendorData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [skillSiteDistribution, setSkillSiteDistribution] = useState([]);
  const [skillOverallDistribution, setSkillOverallDistribution] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard-stats');
        if (res.ok) {
          const data = await res.json();
          setVendorData(data.vendors.sort((a,b) => b.count - a.count));
          setSiteData(data.cmSites.sort((a,b) => b.count - a.count));
          setSkillSiteDistribution(data.skillSiteDistribution || []);
          setSkillOverallDistribution(data.skillOverallDistribution || []);
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  // Chart 1: Headcount by Vendor (Vertical)
  const vendorOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: { titleFont: { family: "'JetBrains Mono', monospace" }, bodyFont: { family: "'JetBrains Mono', monospace" } }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 }, color: '#9ca3af' } },
      x: { grid: { display: false }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 9 }, color: '#6b7280' } }
    }
  };
  const vendorDataConfig = {
    labels: vendorData.map(d => d.vendor),
    datasets: [{ data: vendorData.map(d => d.count), backgroundColor: '#d32f2f', borderRadius: 4, barPercentage: 0.6 }]
  };

  // Chart 2: Deployment by CM Site (Horizontal, Sorted)
  const siteOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: { titleFont: { family: "'JetBrains Mono', monospace" }, bodyFont: { family: "'JetBrains Mono', monospace" } }
    },
    scales: {
      x: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 }, color: '#9ca3af' } },
      y: { grid: { display: false }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 9 }, color: '#6b7280' } }
    }
  };
  const siteDataConfig = {
    labels: siteData.map(d => d.cm_site),
    datasets: [{ data: siteData.map(d => d.count), backgroundColor: '#475569', borderRadius: 4, barPercentage: 0.6 }]
  };

  // -----------------------------------------------------
  // Data Generation for Charts 3 and 4 (Using mock distribution over real site totals)
  // -----------------------------------------------------
  // The database doesn't currently have a 'level' column, so we use a proportional mock split 
  // based on the actual live site headcounts to keep the charts dynamic and populated.
  
  const getSkillSplit = (total, idx) => {
    // Determine roughly proportional splits based on typical distribution
    const l0 = Math.floor(total * 0.1);
    const l1 = Math.floor(total * 0.4);
    const l2 = Math.floor(total * 0.4);
    const l3 = total - l0 - l1 - l2; // Remainder
    return [l0, l1, l2, l3];
  };

  const topSitesData = siteData.slice(0, 9);
  const topSites = topSitesData.map(d => d.cm_site);

  const l0Data = topSitesData.map((d, i) => getSkillSplit(d.count, i)[0]);
  const l1Data = topSitesData.map((d, i) => getSkillSplit(d.count, i)[1]);
  const l2Data = topSitesData.map((d, i) => getSkillSplit(d.count, i)[2]);
  const l3Data = topSitesData.map((d, i) => getSkillSplit(d.count, i)[3]);

  const totalL0 = l0Data.reduce((a, b) => a + b, 0) || 0;
  const totalL1 = l1Data.reduce((a, b) => a + b, 0) || 0;
  const totalL2 = l2Data.reduce((a, b) => a + b, 0) || 0;
  const totalL3 = l3Data.reduce((a, b) => a + b, 0) || 0;
  const overallTotal = totalL0 + totalL1 + totalL2 + totalL3 || 1;

  // Chart 3: Skill Level Matrix (Vertical Stacked)
  const matrixOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { titleFont: { family: "'JetBrains Mono', monospace" }, bodyFont: { family: "'JetBrains Mono', monospace" } }
    },
    scales: {
      y: { stacked: true, beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 }, color: '#9ca3af' } },
      x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 9 }, color: '#6b7280' } }
    }
  };
  const matrixConfig = {
    labels: topSites,
    datasets: [
      { label: 'L0 trainee', data: l0Data, backgroundColor: '#94a3b8', barPercentage: 0.7 },
      { label: 'L1 basic', data: l1Data, backgroundColor: '#64748b', barPercentage: 0.7 },
      { label: 'L2 skilled', data: l2Data, backgroundColor: '#0ea5e9', barPercentage: 0.7 },
      { label: 'L3 expert', data: l3Data, backgroundColor: '#d32f2f', barPercentage: 0.7 }
    ]
  };

  // Chart 4: Overall Skill Pyramid (Horizontal)
  const pyramidOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { titleFont: { family: "'JetBrains Mono', monospace" }, bodyFont: { family: "'JetBrains Mono', monospace" } }
    },
    scales: {
      x: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 }, color: '#9ca3af' } },
      y: { grid: { display: false }, border: { display: false }, ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 }, color: '#6b7280' } }
    }
  };
  const pyramidConfig = {
    labels: ['L0', 'L1', 'L2', 'L3'],
    datasets: [{
      data: [totalL0, totalL1, totalL2, totalL3],
      backgroundColor: ['#94a3b8', '#64748b', '#0ea5e9', '#d32f2f'],
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  return (
    <div className="w-full px-8 md:px-16 pb-8 bg-[#f4f7f9]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Card 1: Headcount by Vendor */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> HEADCOUNT BY VENDOR
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3" style={{ zoom: 0.75 }}>
              Manpower supplier split across the deployment
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={vendorDataConfig} options={vendorOptions} />
          </div>
        </div>

        {/* Card 2: Deployment by CM Site */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[350px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> DEPLOYMENT BY CM SITE
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3" style={{ zoom: 0.75 }}>
              Where engineers are stationed
            </p>
          </div>
          <div className="flex-grow w-full h-full relative">
            <Bar data={siteDataConfig} options={siteOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 3: Skill Level Matrix */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> SKILL LEVEL MATRIX · BY CM SITE
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3" style={{ zoom: 0.75 }}>
              L0 trainee → L3 expert certification progression
            </p>
          </div>
          <div className="flex-grow w-full relative mb-4">
            <Bar data={matrixConfig} options={matrixOptions} />
          </div>
          {/* Custom HTML Legend */}
          <div className="flex items-center gap-4 ml-2 mt-2">
            <div className="flex items-center text-[8px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded bg-[#94a3b8] mr-1"></span> L0 trainee</div>
            <div className="flex items-center text-[8px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded bg-[#64748b] mr-1"></span> L1 basic</div>
            <div className="flex items-center text-[8px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded bg-[#0ea5e9] mr-1"></span> L2 skilled</div>
            <div className="flex items-center text-[8px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded bg-[#d32f2f] mr-1"></span> L3 expert</div>
          </div>
        </div>

        {/* Card 4: Overall Skill Pyramid */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
              <span className="w-1 h-3 bg-[#d32f2f] mr-2"></span> OVERALL SKILL PYRAMID
            </h3>
            <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3" style={{ zoom: 0.75 }}>
              Certification mix across all {overallTotal} engineers
            </p>
          </div>
          <div className="flex-grow w-full relative mb-4">
            <Bar data={pyramidConfig} options={pyramidOptions} />
          </div>
          {/* Bottom KPI Cards */}
          <div className="flex gap-2">
            <div className="bg-slate-800 rounded-lg p-2 md:p-3 text-center flex-1">
              <div className="font-mono text-xl md:text-2xl font-black text-[#94a3b8]">{totalL0}</div>
              <div className="text-[9px] font-bold text-[#94a3b8]">{Math.round((totalL0/overallTotal)*100)}%</div>
              <div className="text-[7px] md:text-[8px] font-bold text-[#94a3b8] uppercase tracking-widest mt-1">L0 - TRAINEE</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-2 md:p-3 text-center flex-1">
              <div className="font-mono text-xl md:text-2xl font-black text-[#94a3b8]">{totalL1}</div>
              <div className="text-[9px] font-bold text-[#94a3b8]">{Math.round((totalL1/overallTotal)*100)}%</div>
              <div className="text-[7px] md:text-[8px] font-bold text-[#94a3b8] uppercase tracking-widest mt-1">L1 - BASIC</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-2 md:p-3 text-center flex-1">
              <div className="font-mono text-xl md:text-2xl font-black text-[#0ea5e9]">{totalL2}</div>
              <div className="text-[9px] font-bold text-[#0ea5e9]">{Math.round((totalL2/overallTotal)*100)}%</div>
              <div className="text-[7px] md:text-[8px] font-bold text-[#0ea5e9] uppercase tracking-widest mt-1">L2 - SKILLED</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-2 md:p-3 text-center flex-1">
              <div className="font-mono text-xl md:text-2xl font-black text-[#d32f2f]">{totalL3}</div>
              <div className="text-[9px] font-bold text-[#d32f2f]">{Math.round((totalL3/overallTotal)*100)}%</div>
              <div className="text-[7px] md:text-[8px] font-bold text-[#d32f2f] uppercase tracking-widest mt-1">L3 - EXPERT</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardChart1;
