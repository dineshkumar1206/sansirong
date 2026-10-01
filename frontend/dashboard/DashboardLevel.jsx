import React from 'react';

const mockData = {
  l0: [
    { name: 'Adithiyan', subtitle: 'DELHI • JAXIS' },
    { name: 'Aduru Pavan Kumar', subtitle: 'SALCOMP • SAEJONG' },
    { name: 'Ajay P', subtitle: 'FXCN • TEAL' },
    { name: 'Aravindhan', subtitle: 'SALCOMP • SAEJONG' },
    { name: 'Buggagari Satish', subtitle: 'FXBL • ASM' },
    { name: 'Challa Vasu', subtitle: 'SALCOMP • SAEJONG' },
    { name: 'Durga Prasad', subtitle: 'SALCOMP • SAEJONG' },
    { name: 'Lokesh.M', subtitle: 'SALCOMP • SAEJONG' },
  ],
  l1: [
    { name: 'Akash B', subtitle: 'YUZHAN • SAEJONG' },
    { name: 'Akash Kumar', subtitle: 'FXBL • ASM' },
    { name: 'Anbarasu', subtitle: 'FXBL • ASM' },
    { name: 'Aravintha Raj', subtitle: 'FXBL • ASM' },
    { name: 'Avudailakshmanon H', subtitle: 'FXBL • TEAL' },
    { name: 'B Sumanth', subtitle: 'FIT • ASM' },
    { name: 'B.Anand Jagan Mohan Rao', subtitle: 'FIT • ASM' },
    { name: 'Balagurunathan', subtitle: 'FXBL • ASM' },
  ],
  l2: [
    { name: 'Adarsha', subtitle: 'FXBL • TEAL' },
    { name: 'Akhil Chandran', subtitle: 'FIT • ASM' },
    { name: 'Akshaya Kumar', subtitle: 'YUZHAN • LUSTER' },
    { name: 'Arun Prakash', subtitle: 'TEHR • ASM' },
    { name: 'Aryan Kumar', subtitle: 'FXBL • TEAL' },
    { name: 'B.Saida Rao', subtitle: 'FIT • ASM' },
    { name: 'Balaji Arul Prakash', subtitle: 'FXBL • ASM' },
    { name: 'Balamurugan', subtitle: 'YUZHAN • SAEJONG' },
  ],
  l3: [
    { name: 'A Ramanan', subtitle: 'YUZHAN • SAEJONG' },
    { name: 'Ajmal', subtitle: 'TESS • BSC' },
    { name: 'Bharathan', subtitle: 'FXCN • WOW TOP' },
    { name: 'Jeeva', subtitle: 'FXBL • WOW TOP' },
    { name: 'Jegadesan S', subtitle: 'TESS • WOW TOP' },
    { name: 'Karuppaiya C', subtitle: 'TEHR • SAEJONG' },
    { name: 'Mukesh', subtitle: 'YUZHAN • LUSTER' },
    { name: 'Munusamy', subtitle: 'FXBL • ASM' },
  ]
};

const DashboardLevel = () => {
  return (
    <div className="w-full px-8 md:px-16 pb-12 mt-8">
      <div className="flex items-center mb-2">
        <h2 className="text-[#d32f2f] text-xs font-extrabold tracking-widest uppercase flex items-center">
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> SKILL LEVEL ROSTER • NAMES
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-[#d32f2f] shadow-sm overflow-hidden p-6">
        
        <div className="mb-6">
          <div className="flex items-center">
             <div className="w-1 h-4 bg-[#d32f2f] mr-2"></div>
             <h3 className="text-gray-900 text-sm font-black tracking-widest uppercase">
               ENGINEERS BY SKILL LEVEL
             </h3>
          </div>
          <p className="text-gray-400 text-[10px] font-medium mt-1 ml-3">
            Named roster from the vendor detail sheets - respects the filters above
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* L0 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
               <h4 className="text-gray-400 text-[11px] font-black tracking-widest uppercase">L0 <span className="font-bold text-gray-500">TRAINEE</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  14 • 10%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {mockData.l0.map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-xs font-bold text-gray-900">{item.name}</div>
                  <div className="text-[9px] font-mono text-gray-500 mt-0.5">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* L1 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
               <h4 className="text-gray-400 text-[11px] font-black tracking-widest uppercase">L1 <span className="font-bold text-gray-500">BASIC</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  49 • 37%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {mockData.l1.map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-xs font-bold text-gray-900">{item.name}</div>
                  <div className="text-[9px] font-mono text-gray-500 mt-0.5">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* L2 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#29b6f6]"></div>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center mt-1">
               <h4 className="text-[#29b6f6] text-[11px] font-black tracking-widest uppercase">L2 <span className="font-bold text-gray-500">SKILLED</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  56 • 42%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {mockData.l2.map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-xs font-bold text-gray-900">{item.name}</div>
                  <div className="text-[9px] font-mono text-gray-500 mt-0.5">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* L3 Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#d32f2f]"></div>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center mt-1">
               <h4 className="text-[#d32f2f] text-[11px] font-black tracking-widest uppercase">L3 <span className="font-bold text-gray-500">EXPERT</span></h4>
               <div className="border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-gray-500">
                  15 • 11%
               </div>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {mockData.l3.map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-xs font-bold text-gray-900">{item.name}</div>
                  <div className="text-[9px] font-mono text-gray-500 mt-0.5">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1; 
        }
      `}</style>
    </div>
  );
};

export default DashboardLevel;
