import config from '../src/config';
import React, { useState, useRef, useEffect } from 'react';
import { FiRefreshCw, FiUpload } from 'react-icons/fi';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import * as XLSX from 'xlsx';
import { DATA } from './mockData';
import AddRequirementModal from './AddRequirementModal';

const DashboardContent = () => {
  const [selectedVendor, setSelectedVendor] = useState('ALL');
  const [selectedSite, setSelectedSite] = useState('ALL');
  const [vendors, setVendors] = useState([]);
  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState({
    engineers: "0",
    avgAge: "0",
    l2Certified: "53%",
    vendorsCount: "0",
    cmSitesCount: "0",
    matrix: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboardStats = async () => {
    try {
      const url = new URL(`${config.API_BASE_URL}/api/dashboard-stats`);
      if (selectedVendor !== 'ALL') url.searchParams.append('vendor', selectedVendor);
      if (selectedSite !== 'ALL') url.searchParams.append('site', selectedSite);

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Only set vendors/sites if they are empty (so we keep the full list in the UI filters)
        // or we could just set them once, but since we always return the full list from backend, we can set it.
        setVendors(data.vendors.map(v => ({ name: v.vendor, count: v.count })));
        setSites(data.cmSites.map(s => ({ name: s.cm_site, count: s.count })));
        
        setStats(prev => ({
          ...prev,
          engineers: data.engineers?.toString() || "0",
          avgAge: data.avgAge?.toString() || "0",
          vendorsCount: selectedVendor !== 'ALL' ? "1" : (data.vendors?.length.toString() || "0"),
          cmSitesCount: selectedSite !== 'ALL' ? "1" : (data.cmSites?.length.toString() || "0"),
          matrix: data.matrix || []
        }));
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [selectedVendor, selectedSite]);

  const fileInputRef = useRef(null);

  const computeInsights = () => {
    const active = parseInt(stats.engineers) || 0;
    
    // Filter the mock data
    const filteredExits = (DATA.exits || []).filter(e => 
      (selectedVendor === 'ALL' || e.vendor === selectedVendor) &&
      (selectedSite === 'ALL' || e.site === selectedSite)
    );
    const filteredRoster = (DATA.roster || []).filter(r => 
      (selectedVendor === 'ALL' || r.vendor === selectedVendor) &&
      (selectedSite === 'ALL' || r.site === selectedSite)
    );
    // Note: Interviews mock data doesn't seem to have vendor/site consistently, so we might just not filter them, or filter if present.
    // For now we'll just not filter interviews, or we can assume it applies globally unless we want to map it.

    const exits = filteredExits;
    const roster = filteredRoster;
    const ivs = DATA.interviews || [];
    const out = [];

    const SEVC = { crit: '#d32f2f', warn: '#f97316', good: '#22c55e' };
    const push = (sev, val, label, note, tag) => out.push({ sev, val, label, note, tag, color: SEVC[sev] });

    // Attrition rate
    const attr = active + exits.length > 0 ? (exits.length / (active + exits.length)) * 100 : 0;
    push(attr >= 25 ? 'crit' : attr >= 12 ? 'warn' : 'good', Math.round(attr) + '%', 'ATTRITION RATE',
      attr >= 25 ? 'Critical — roughly 1 in 4 have left. Retention needs urgent focus.' : attr >= 12 ? 'Elevated turnover — worth investigating root causes.' : 'Healthy retention levels.', attr >= 25 ? 'HIGH' : attr >= 12 ? 'WATCH' : 'OK');

    // Early exits <3mo
    const te = exits.filter(e => e.tenure != null);
    const early = te.filter(e => e.tenure < 3).length;
    const earlyPct = te.length ? Math.round((early / te.length) * 100) : 0;
    push(earlyPct >= 40 ? 'crit' : earlyPct >= 20 ? 'warn' : 'good', earlyPct + '%', 'EARLY EXITS (<3 MO)',
      earlyPct >= 40 ? 'Most leavers quit within 90 days — onboarding & fit need attention.' : earlyPct >= 20 ? 'Notable early attrition — review the first-90-days experience.' : 'Early attrition is under control.', earlyPct >= 40 ? 'HIGH' : earlyPct >= 20 ? 'WATCH' : 'OK');

    // Skill readiness
    const skTot = roster.length, l2 = roster.filter(r => +r.level[1] >= 2).length;
    const certPct = skTot ? Math.round((l2 / skTot) * 100) : 0;
    push(certPct < 40 ? 'crit' : certPct < 60 ? 'warn' : 'good', certPct + '%', 'SKILL READINESS (L2+)',
      certPct < 40 ? 'Low expert coverage — accelerate certification programmes.' : certPct < 60 ? 'Skill build-up needed to strengthen the expert tier.' : 'Strong certified, expert-ready base.', certPct < 40 ? 'LOW' : certPct < 60 ? 'BUILD' : 'STRONG');

    // Uncertified / L0
    const uncert = roster.filter(r => r.level === 'L0').length;
    push(uncert > active * 0.35 ? 'warn' : 'good', uncert, 'UNCERTIFIED / L0',
      'Engineers without an L2+ certification — the priority pool for upskilling.', uncert > active * 0.35 ? 'GAP' : 'OK');

    // Top Vendor Share
    const topV = vendors.length > 0 ? vendors.reduce((max, v) => v.count > max.count ? v : max, vendors[0]) : { name: '—', count: 0 };
    const share = active ? Math.round((topV.count / active) * 100) : 0;
    push(share >= 45 ? 'crit' : share >= 32 ? 'warn' : 'good', share + '%', 'TOP VENDOR SHARE',
      share >= 45 ? `Over-reliant on ${topV.name} — supplier-concentration risk.` : share >= 32 ? `${topV.name} is the dominant supplier — monitor dependency.` : 'Balanced vendor mix, low concentration risk.', topV.name);

    // Sites w/o L3 Expert
    const siteL3 = {}; roster.forEach(r => { if (+r.level[1] === 3) siteL3[r.site] = (siteL3[r.site] || 0) + 1; });
    const sitesActive = [...new Set(roster.map(r => r.site))];
    const noExp = sitesActive.filter(s => !(siteL3[s] > 0));
    push(noExp.length > 0 ? 'warn' : 'good', noExp.length, 'SITES W/O L3 EXPERT',
      noExp.length > 0 ? 'Sites with no expert on-site — single-point-of-failure risk: ' + noExp.slice(0, 4).join(', ') + (noExp.length > 4 ? '…' : '') : 'Every active site has expert cover.', noExp.length > 0 ? 'RISK' : 'OK');

    // Interview Conversion
    const joined = ivs.filter(x => /join/i.test((x.status || '') + ' ' + (x.comment || ''))).length;
    const conv = ivs.length ? Math.round((joined / ivs.length) * 100) : 0;
    push(conv < 4 ? 'warn' : 'good', conv + '%', 'INTERVIEW CONVERSION',
      `${joined} of ${ivs.length} interviewed candidates converted to hires.`, conv < 4 ? 'LOW' : 'OK');

    return out;
  };

  const insights = computeInsights();

  // Also calculate L2+ Certified for the top stats grid
  const _roster = (DATA.roster || []).filter(r => 
    (selectedVendor === 'ALL' || r.vendor === selectedVendor) &&
    (selectedSite === 'ALL' || r.site === selectedSite)
  );
  const skTot = _roster.length, l2 = _roster.filter(r => +r.level[1] >= 2).length;
  const computedL2Certified = skTot ? Math.round((l2 / skTot) * 100) + '%' : '0%';

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // First send to backend API to store in MySQL database
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/upload-master`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert('File successfully uploaded to database! Metrics: ' + JSON.stringify(data.metrics));
        fetchDashboardStats(); // Refresh stats after upload
      } else {
        alert('Error uploading file to DB: ' + data.error);
      }
    } catch (err) {
      console.error('API Error:', err);
      alert('Failed to connect to backend for database upload.');
    }
    
    // Clear file input
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  // Compute Matrix Data
  const matrixRaw = stats.matrix || [];
  const _matrixSites = [...new Set(matrixRaw.map(m => m.cm_site))].sort((a,b) => {
    const aTot = matrixRaw.filter(m => m.cm_site === a).reduce((sum, m) => sum + m.count, 0);
    const bTot = matrixRaw.filter(m => m.cm_site === b).reduce((sum, m) => sum + m.count, 0);
    return bTot - aTot; // Descending
  });
  const _matrixVendors = [...new Set(matrixRaw.map(m => m.vendor))].sort((a,b) => {
    const aTot = matrixRaw.filter(m => m.vendor === a).reduce((sum, m) => sum + m.count, 0);
    const bTot = matrixRaw.filter(m => m.vendor === b).reduce((sum, m) => sum + m.count, 0);
    return bTot - aTot; // Descending
  });

  const getMatrixCount = (vendor, site) => {
    const found = matrixRaw.find(m => m.vendor === vendor && m.cm_site === site);
    return found ? found.count : 0;
  };

  const getMatrixVendorTotal = (vendor) => {
    return matrixRaw.filter(m => m.vendor === vendor).reduce((sum, m) => sum + m.count, 0);
  };

  const getMatrixSiteTotal = (site) => {
    return matrixRaw.filter(m => m.cm_site === site).reduce((sum, m) => sum + m.count, 0);
  };

  const matrixGrandTotal = matrixRaw.reduce((sum, m) => sum + m.count, 0);
  const matrixMaxCount = Math.max(...matrixRaw.map(m => m.count), 1);

  const getHeatmapColor = (count, isSelectedVendor, isSelectedSite, isSelectedCell) => {
    if (!count) return 'bg-transparent text-gray-400';
    if (isSelectedCell) return 'bg-[#b71c1c] text-white font-bold ring-2 ring-[#b71c1c] shadow-md z-10 scale-110 transition-transform';
    if (isSelectedVendor || isSelectedSite) return 'bg-[#d32f2f] text-white font-bold';
    
    const ratio = count / matrixMaxCount;
    if (ratio > 0.7) return 'bg-[#d32f2f] text-white';
    if (ratio > 0.4) return 'bg-[#ef5350] text-white';
    if (ratio > 0.15) return 'bg-[#ff8a80] text-white';
    return 'bg-[#ffcdd2] text-[#d32f2f]';
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
          button { font-family: 'JetBrains Mono', monospace !important; }
        `}
      </style>
      <div className="w-full bg-[#f4f7f9] min-h-screen px-8 md:px-16 py-8" style={{
          fontFamily: "'Archivo', sans-serif",
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
      }}>
        
      {/* Action Bar */}
      <div className="flex items-center space-x-3 mb-4">
        <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-[#29b6f6] to-[#0288d1] text-white px-5 py-2 rounded-md font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center cursor-pointer">
          <span className="mr-2 text-lg leading-none">+</span> Add Requirement
        </button>
        <button className="bg-[#d32f2f] text-white px-5 py-2 rounded-md font-bold text-sm shadow-md hover:bg-[#b71c1c] active:scale-95 transition-all flex items-center cursor-pointer">
          <FiRefreshCw className="mr-2" /> Sync from Google Sheet
        </button>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white border border-gray-300 text-gray-600 px-5 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center cursor-pointer"
        >
          <FiUpload className="mr-2" /> Upload file
        </button>
      </div>



      {/* Filters Section */}
      <div className="space-y-3 mb-8 border-t border-gray-200 pt-4">
        <div className="flex items-center">
          <span className="text-gray-500 font-bold text-[11px] tracking-widest uppercase w-20">Vendor</span>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedVendor('ALL')} className={`${selectedVendor === 'ALL' ? 'bg-[#d32f2f] text-white border-[#d32f2f]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} border px-4 py-1 rounded-md text-[11px] font-bold shadow-sm active:scale-95 transition-all cursor-pointer`}>
              ALL
            </button>
            {vendors.map(vendor => (
              <button key={vendor.name} onClick={() => setSelectedVendor(vendor.name)} className={`${selectedVendor === vendor.name ? 'bg-[#d32f2f] text-white border-[#d32f2f]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} border px-3 py-1 rounded-md text-[11px] font-bold shadow-sm active:scale-95 transition-all cursor-pointer`}>
                {vendor.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 font-bold text-[11px] tracking-widest uppercase w-20 leading-tight">CM<br/>Site</span>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedSite('ALL')} className={`${selectedSite === 'ALL' ? 'bg-[#d32f2f] text-white border-[#d32f2f]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} border px-4 py-1 rounded-md text-[11px] font-bold shadow-sm active:scale-95 transition-all cursor-pointer`}>
              ALL
            </button>
            {sites.map(site => (
              <button key={site.name} onClick={() => setSelectedSite(site.name)} className={`${selectedSite === site.name ? 'bg-[#d32f2f] text-white border-[#d32f2f]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} border px-3 py-1 rounded-md text-[11px] font-bold shadow-sm active:scale-95 transition-all cursor-pointer`}>
                {site.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {[
          { title: "ENGINEERS", value: stats.engineers, desc: "Deployed (matrix)", glow: "from-red-50" },
          { title: "AVG AGE", value: stats.avgAge, desc: "Years - from records", glow: "from-gray-50" },
          { title: "L2+ CERTIFIED", value: stats.l2Certified, desc: "Skilled / expert tier", glow: "from-orange-50", valueColor: "text-gray-900", suffixColor: "text-orange-500" },
          { title: "VENDORS", value: stats.vendorsCount, desc: "Manpower suppliers", glow: "from-blue-50" },
          { title: "CM SITES", value: stats.cmSitesCount, desc: "Deployment locations", glow: "from-green-50" }
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 bg-gradient-to-tr ${stat.glow} to-white relative overflow-hidden`}>
             <h3 className="text-gray-600 text-[10px] font-extrabold tracking-widest uppercase mb-1">{stat.title}</h3>
             <div className="flex items-baseline">
                <span className={`font-mono tracking-tighter text-4xl font-black ${stat.valueColor || 'text-gray-900'}`}>
                    {stat.value.replace('%','')}
                </span>
                {stat.value.includes('%') && <span className={`font-mono tracking-tighter text-xl font-bold ml-1 ${stat.suffixColor || 'text-gray-900'}`}>%</span>}
             </div>
             <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight" style={{ zoom: 0.75 }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Insights Header */}
      <div className="mb-4 flex items-center">
        <h2 className="text-[#d32f2f] text-xs font-extrabold tracking-widest uppercase flex items-center">
            <BsGrid3X3GapFill className="mr-2 text-sm"/> EXECUTIVE INSIGHTS & RISK FLAGS
        </h2>
      </div>
      <div className="mb-6 flex items-center text-sm font-semibold text-gray-700">
        <span>Auto-computed from live data</span>
        <span className="mx-2">·</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-sm bg-[#d32f2f] mr-1"></span> critical</span>
        <span className="mx-2">·</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-sm bg-orange-500 mr-1"></span> watch</span>
        <span className="mx-2">·</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-sm bg-green-500 mr-1"></span> healthy</span>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm relative" style={{ borderLeft: `4px solid ${insight.color}` }}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
                 <span className="w-1.5 h-1.5 rotate-45 mr-2" style={{ backgroundColor: insight.color }}></span> {insight.label}
              </h3>
              <span className="text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase" style={{ backgroundColor: insight.color }}>{insight.tag}</span>
            </div>
            <div className="font-mono tracking-tighter text-5xl font-black mb-2" style={{ color: insight.color }}>{insight.val}</div>
            <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
              {insight.note}
            </p>
          </div>
        ))}

      </div>

      {isModalOpen && <AddRequirementModal onClose={() => setIsModalOpen(false)} />}

    </div>
    </>
  );
};

export default DashboardContent;
