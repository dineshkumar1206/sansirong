import React from 'react';
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
import { matrixData, sites, colTotals } from './DashboardSkill';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart1 = () => {
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
    labels: matrixData.map(d => d.vendor),
    datasets: [{ data: matrixData.map(d => d.total), backgroundColor: '#d32f2f', borderRadius: 4, barPercentage: 0.6 }]
  };

  // Chart 2: Deployment by CM Site (Horizontal, Sorted)
  const siteDataCombined = sites.map((site, i) => ({ site, total: colTotals[i] })).sort((a, b) => b.total - a.total);
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
    labels: siteDataCombined.map(d => d.site),
    datasets: [{ data: siteDataCombined.map(d => d.total), backgroundColor: '#475569', borderRadius: 4, barPercentage: 0.6 }]
  };

  // -----------------------------------------------------
  // Data Generation for Charts 3 and 4
  // -----------------------------------------------------
  const getSkillSplit = (total, idx) => {
    const splits = [
      [0, 18, 25, 5], // FXBL: 48
      [4, 14, 22, 5], // YUZHAN: 45
      [0, 4, 9, 1],   // TEHR: 14
      [0, 8, 6, 0],   // FIT: 14
      [3, 3, 2, 2],   // FXCN: 10
      [1, 1, 2, 0],   // TESS: 4
      [0, 2, 1, 0],   // PTI: 3
      [1, 2, 0, 0],   // CEAT: 3
      [0, 1, 0, 1],   // DELHI: 2
      [0, 1, 0, 0],   // FXBLPTI: 1
      [0, 0, 1, 0],   // WOWTEK: 1
    ];
    return splits[idx] || [0, 0, total, 0];
  };

  const skillData = sites.map((site, i) => ({
    site,
    total: colTotals[i],
    split: getSkillSplit(colTotals[i], i)
  })).sort((a, b) => b.total - a.total).slice(0, 9); // Match chart visual density

  const l0Data = skillData.map(d => d.split[0]);
  const l1Data = skillData.map(d => d.split[1]);
  const l2Data = skillData.map(d => d.split[2]);
  const l3Data = skillData.map(d => d.split[3]);

  const totalL0 = l0Data.reduce((a, b) => a + b, 0);
  const totalL1 = l1Data.reduce((a, b) => a + b, 0);
  const totalL2 = l2Data.reduce((a, b) => a + b, 0);
  const totalL3 = l3Data.reduce((a, b) => a + b, 0);
  const overallTotal = totalL0 + totalL1 + totalL2 + totalL3;

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
    labels: skillData.map(d => d.site),
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
