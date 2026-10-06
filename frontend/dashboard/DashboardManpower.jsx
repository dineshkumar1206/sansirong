import React from 'react';

const DashboardManpower = () => {
  return (
    <div className="w-full font-sans px-8 md:px-16 pb-12 mt-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-600 rotate-45"></div>
        <h2 className="text-red-600 font-bold tracking-widest text-sm uppercase">
          Manpower Requirements
        </h2>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Card Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-4 bg-red-600"></div>
            <h3 className="font-bold text-gray-900 tracking-wider text-sm uppercase">
              Open Requirements
            </h3>
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              0
            </span>
          </div>
          <p className="text-xs text-gray-400 pl-3">
            Raised from the dashboard - emailed & logged on submit - stored on this device
          </p>
        </div>

        {/* Data Table */}
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-[#0f172a] text-gray-400 text-[10px] font-bold uppercase tracking-wider grid grid-cols-9 px-4 py-3">
            <div>Raised</div>
            <div>Vendor</div>
            <div>Site</div>
            <div>Role</div>
            <div>Qty</div>
            <div>Level</div>
            <div>Check-point</div>
            <div>Salary</div>
            <div>By</div>
          </div>
          
          <div className="bg-white px-4 py-8 text-center text-sm text-gray-600 font-mono">
            No requirements yet — click "+ Add Requirement" to raise one
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardManpower;
