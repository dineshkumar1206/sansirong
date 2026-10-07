import React, { useState, useRef, useEffect } from 'react';
import { FiRefreshCw, FiUpload } from 'react-icons/fi';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import * as XLSX from 'xlsx';

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
    cmSitesCount: "0"
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard-stats');
      if (response.ok) {
        const data = await response.json();
        setVendors(data.vendors.map(v => ({ name: v.vendor, count: v.count })));
        setSites(data.cmSites.map(s => ({ name: s.cm_site, count: s.count })));
        setStats(prev => ({
          ...prev,
          engineers: data.engineers?.toString() || "0",
          avgAge: data.avgAge?.toString() || "0",
          vendorsCount: data.vendors?.length.toString() || "0",
          cmSitesCount: data.cmSites?.length.toString() || "0"
        }));
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // First send to backend API to store in MySQL database
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://localhost:5000/api/upload-master', {
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
        <button className="bg-gradient-to-r from-[#29b6f6] to-[#0288d1] text-white px-5 py-2 rounded-md font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center cursor-pointer">
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

      {/* Warning Message */}
      <div className="mb-6">
        <p className="text-[#ef4444] text-[10px] font-semibold tracking-wide flex items-center">
          <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#ef4444] mr-2"></span>
          Couldn't reach the Google Sheet (Failed to fetch). Showing last saved data. Live sync works only on the deployed Netlify site.
        </p>
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
        
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-[#d32f2f] relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
               <span className="w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> ATTRITION RATE
            </h3>
            <span className="bg-[#d32f2f] text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">HIGH</span>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-[#d32f2f] mb-2">33%</div>
          <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
            Critical — roughly 1 in 4 have left. Retention needs urgent focus.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-green-500 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
               <span className="w-1.5 h-1.5 rotate-45 bg-green-500 mr-2"></span> EARLY EXITS (&lt;3 MO)
            </h3>
            <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">OK</span>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-green-500 mb-2">13%</div>
          <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
            Early attrition is under control.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-orange-500 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
               <span className="w-1.5 h-1.5 rotate-45 bg-orange-500 mr-2"></span> SKILL READINESS (L2+)
            </h3>
            <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">BUILD</span>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-orange-500 mb-2">53%</div>
          <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
            Skill build-up needed to strengthen the expert tier.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-green-500 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
               <span className="w-1.5 h-1.5 rotate-45 bg-green-500 mr-2"></span> UNCERTIFIED / L0
            </h3>
            <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">OK</span>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-green-500 mb-2">39</div>
          <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
            Engineers without an L2+ certification — the priority pool for upskilling.
          </p>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-green-500 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
               <span className="w-1.5 h-1.5 rotate-45 bg-green-500 mr-2"></span> TOP VENDOR SHARE
            </h3>
            <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">ASM</span>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-green-500 mb-2">30%</div>
          <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
            Balanced vendor mix, low concentration risk.
          </p>
        </div>

        {/* Card 6 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-orange-500 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
               <span className="w-1.5 h-1.5 rotate-45 bg-orange-500 mr-2"></span> SITES W/O L3 EXPERT
            </h3>
            <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">RISK</span>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-orange-500 mb-2">3</div>
          <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
            Sites with no expert on-site — single-point-of-failure risk: FIT, PTI, FXBLPTI
          </p>
        </div>
        
        {/* Card 7 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-orange-500 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-[10px] font-extrabold tracking-widest uppercase flex items-center">
               <span className="w-1.5 h-1.5 rotate-45 bg-orange-500 mr-2"></span> INTERVIEW CONVERSION
            </h3>
            <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">LOW</span>
          </div>
          <div className="font-mono tracking-tighter text-5xl font-black text-orange-500 mb-2">3%</div>
          <p className="text-gray-500 text-[10px] font-light leading-tight" style={{ zoom: 0.75 }}>
            7 of 276 interviewed candidates converted to hires.
          </p>
        </div>

      </div>

    </div>
    </>
  );
};

export default DashboardContent;
