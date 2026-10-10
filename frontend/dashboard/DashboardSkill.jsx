import config from '../src/config';
import React, { useState, useEffect } from 'react';

export const columns = ['Vendor \\ Site', 'FXBL', 'YUZHAN', 'TEHR', 'FIT', 'FXCN', 'TESS', 'PTI', 'CEAT', 'DELHI', 'FXBLPTI', 'WOWTEK', 'Total'];
export const sites = columns.slice(1, -1);
  
export const matrixData = [
  { vendor: 'ASM', counts: [32, 0, 1, 10, 0, 0, 0, 0, 0, 0, 0], total: 43 },
  { vendor: 'TEAL', counts: [9, 0, 8, 4, 6, 0, 3, 0, 0, 1, 0], total: 31 },
  { vendor: 'SAEJONG', counts: [0, 29, 1, 0, 0, 0, 0, 0, 0, 0, 0], total: 30 },
  { vendor: 'LUSTER', counts: [0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 16 },
  { vendor: 'INDO-MIM', counts: [2, 0, 4, 0, 2, 1, 0, 0, 0, 0, 0], total: 9 },
  { vendor: 'WOW TOP', counts: [5, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], total: 7 },
  { vendor: 'BSC', counts: [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], total: 3 },
  { vendor: 'CEAT', counts: [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0], total: 3 },
  { vendor: 'JAXIS', counts: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0], total: 2 },
  { vendor: 'ALLEGRO', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], total: 1 },
];

export const colTotals = [48, 45, 14, 14, 10, 4, 3, 3, 2, 1, 1];
export const grandTotal = 145;
const DashboardSkill = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [matrixRaw, setMatrixRaw] = useState([]);

  useEffect(() => {
    const fetchMatrix = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/dashboard-stats`);
        if (res.ok) {
          const data = await res.json();
          setMatrixRaw(data.matrix || []);
        }
      } catch (err) {
        console.error('Failed to fetch matrix data', err);
      }
    };
    fetchMatrix();
  }, []);

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

  const _columns = ['Vendor \\ Site', ..._matrixSites, 'Total'];
  const _sites = _matrixSites;
  
  const _matrixData = _matrixVendors.map(vendor => {
    const counts = _matrixSites.map(site => {
      const found = matrixRaw.find(m => m.vendor === vendor && m.cm_site === site);
      return found ? found.count : 0;
    });
    const total = counts.reduce((a, b) => a + b, 0);
    return { vendor, counts, total };
  });

  const _colTotals = _matrixSites.map(site => {
    return matrixRaw.filter(m => m.cm_site === site).reduce((sum, m) => sum + m.count, 0);
  });
  
  const _grandTotal = matrixRaw.reduce((sum, m) => sum + m.count, 0);

  const getCellColor = (count, max) => {
    if (count === 0) return 'bg-[#f8f9fa] text-transparent';
    if (!max) max = 1;
    const ratio = count / max;
    if (ratio >= 0.7) return 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md shadow-red-500/40';
    if (ratio >= 0.4) return 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-sm shadow-red-400/30';
    if (ratio >= 0.2) return 'bg-gradient-to-br from-red-300 to-red-400 text-white';
    return 'bg-gradient-to-br from-red-100 to-red-200 text-red-800';
  };
  const matrixMaxCount = Math.max(...matrixRaw.map(m => m.count), 1);

  return (
    <div className="w-full px-8 md:px-16 pb-8 bg-[#f4f7f9]">
      {/* Section Header */}
      <div className="mb-4 flex items-center" data-aos="fade-right">
        <h2 className="text-[#d32f2f] text-xs font-extrabold tracking-widest uppercase flex items-center">
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> DEPLOYMENT & SKILL DISTRIBUTION
        </h2>
      </div>

      {/* Matrix Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-shadow duration-500" data-aos="fade-up" data-aos-delay="100">
        <div className="mb-6">
          <h3 className="text-gray-900 text-[11px] font-black tracking-widest uppercase flex items-center">
            <span className="w-1 h-3 bg-gradient-to-b from-red-500 to-red-700 mr-2 rounded-full"></span> VENDOR × CM SITE DEPLOYMENT MATRIX
          </h3>
          <p className="text-gray-500 text-[10px] font-light mt-1 leading-tight ml-3" style={{ zoom: 0.75 }}>
            Built from Master Data - click any vendor, site, or cell to filter the dashboard
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full border-separate" style={{ borderSpacing: '4px' }}>
            <thead>
              <tr>
                {_columns.map((col, idx) => {
                  const isSite = idx > 0 && idx < _columns.length - 1;
                  const isSelected = isSite && col === selectedSite;
                  return (
                    <th 
                      key={idx} 
                      onClick={() => isSite && setSelectedSite(isSelected ? null : col)}
                      className={`font-mono text-[11px] font-bold uppercase pb-2 pt-2 px-2 rounded-md transition-colors
                        ${idx === 0 ? 'text-left pl-2 text-gray-500 cursor-default' : 'text-center'} 
                        ${idx === _columns.length - 1 ? 'bg-gray-100 rounded-md text-gray-800 cursor-default' : ''}
                        ${isSelected ? 'bg-[#d32f2f] text-white shadow-md' : (isSite ? 'text-gray-500 hover:bg-gray-100 cursor-pointer' : '')}
                      `}
                    >
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {_matrixData.map((row, rIdx) => {
                const isVendorSelected = row.vendor === selectedVendor;
                return (
                  <tr key={rIdx} data-aos="fade-up" data-aos-delay={100 + (rIdx * 50)}>
                    <td 
                      onClick={() => setSelectedVendor(isVendorSelected ? null : row.vendor)}
                      className={`font-mono text-[11px] font-bold py-3 px-3 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 hover:translate-x-1
                        ${isVendorSelected ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}
                      `}
                    >
                      {row.vendor}
                    </td>
                    
                    {row.counts.map((count, cIdx) => {
                      const site = _sites[cIdx];
                      const isHighlighted = (isVendorSelected || site === selectedSite) && count > 0;
                      
                      return (
                        <td key={cIdx} className="text-center p-0">
                          <div 
                            onClick={() => { setSelectedVendor(row.vendor); setSelectedSite(site); }}
                            className={`mx-auto flex items-center justify-center rounded-xl font-mono text-xs font-bold h-10 w-full min-w-[36px] transition-all duration-300 cursor-pointer 
                            ${getCellColor(count, matrixMaxCount)} 
                            ${count > 0 ? 'hover:scale-[1.15] hover:-translate-y-1 hover:shadow-xl hover:z-10 relative' : 'hover:bg-gray-100'}
                            border-[2px] ${isHighlighted ? 'border-orange-400 shadow-md ring-2 ring-orange-200' : 'border-transparent'}`}
                          >
                            {count > 0 ? count : ''}
                          </div>
                        </td>
                      );
                    })}
                    
                    <td className="text-center p-0">
                      <div className="mx-auto flex items-center justify-center bg-gray-50 rounded-xl font-mono text-[11px] font-black h-10 w-full min-w-[36px] text-gray-800 shadow-inner">
                        {row.total}
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {/* Totals Row */}
              <tr>
                <td className="font-mono text-[11px] font-black text-gray-800 py-2 pl-2 rounded-md bg-gray-50 mt-2 block">
                  Total
                </td>
                {_colTotals.map((total, idx) => (
                  <td key={idx} className="text-center p-0 pt-2">
                    <div className="mx-auto flex items-center justify-center bg-gray-50 rounded-md font-mono text-[11px] font-black h-8 w-full min-w-[32px] text-gray-800">
                      {total}
                    </div>
                  </td>
                ))}
                <td className="text-center p-0 pt-2">
                  <div className="mx-auto flex items-center justify-center bg-[#d32f2f] rounded-md font-mono text-[11px] font-black text-white h-8 w-full min-w-[32px] shadow-sm">
                    {_grandTotal}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkill;
