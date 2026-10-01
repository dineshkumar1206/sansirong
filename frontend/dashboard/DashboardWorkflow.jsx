import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const mockData = [
  { name: 'Aravintha Raj', vendor: 'ASM', site: 'FXBL', district: 'Nagapattinam', cert: 'L1', age: 26, qual: 'Diploma', dept: 'Fatp' },
  { name: 'Bharath Raj', vendor: 'ASM', site: 'FXBL', district: 'Cuddalore', cert: '-', age: 26, qual: 'Engineering (UG)', dept: 'Fatp' },
  { name: 'Siva Prakash', vendor: 'ASM', site: 'FXBL', district: 'Cuddalore', cert: 'L1', age: 26, qual: 'Engineering (UG)', dept: 'Fatp' },
  { name: 'Akash Kumar', vendor: 'ASM', site: 'FXBL', district: 'Cuddalore', cert: 'L1', age: 26, qual: 'Diploma', dept: 'Fatp' },
  { name: 'Nithesh S', vendor: 'INDO-MIM', site: 'FXBL', district: 'Unknown', cert: 'L3', age: 27, qual: 'Engineering (UG)', dept: 'Me' },
  { name: 'Naveen T', vendor: 'INDO-MIM', site: 'TEHR', district: 'Ramanathapuram', cert: 'L1', age: 25, qual: 'Engineering (UG)', dept: 'Fatp' },
  { name: 'Naveen Prasanth S', vendor: 'ASM', site: 'FXBL', district: 'Karnataka', cert: 'L2', age: 22, qual: 'Diploma', dept: 'Secote' },
  { name: 'Vijay Np', vendor: 'ASM', site: 'FXBL', district: 'Erode', cert: '-', age: 23, qual: 'Engineering (UG)', dept: 'Fatp' },
  { name: 'Sanjay M', vendor: 'ASM', site: 'FXBL', district: 'Erode', cert: 'L2', age: 22, qual: 'Engineering (UG)', dept: 'Fatp' },
  { name: 'Gowtham S', vendor: 'ASM', site: 'FXBL', district: 'Ariyalur', cert: 'L2', age: 23, qual: 'Other', dept: 'Fatp' },
  { name: 'Gopal', vendor: 'ASM', site: 'FXBL', district: 'Ramnadu', cert: 'L2', age: 30, qual: 'Engineering (UG)', dept: 'Fatp' },
];

const getCertStyle = (cert) => {
  switch (cert) {
    case 'L1': return 'bg-gray-200 text-gray-700';
    case 'L2': return 'bg-blue-100 text-blue-600';
    case 'L3': return 'bg-red-100 text-red-600';
    default: return 'bg-gray-100 text-gray-400';
  }
};

const DashboardWorkflow = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full px-8 md:px-16 pb-12">
      <div className="flex items-center mb-2">
        <h2 className="text-[#d32f2f] text-xs font-extrabold tracking-widest uppercase flex items-center">
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> WORKFORCE DIRECTORY
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-[#d32f2f] shadow-sm overflow-hidden p-6">
        
        <div className="mb-4">
          <div className="flex items-center">
             <div className="w-1 h-4 bg-[#d32f2f] mr-2"></div>
             <h3 className="text-gray-900 text-sm font-black tracking-widest uppercase flex items-center">
               ENGINEERS <span className="ml-3 bg-[#d32f2f] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">141</span>
             </h3>
          </div>
          <p className="text-gray-400 text-[10px] font-medium mt-1">
            Click any vendor, CM site, or matrix cell above to drill in - click a person to see their full profile
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 text-lg" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#d32f2f] focus:bg-white text-gray-700 placeholder-gray-400"
            placeholder="Search by name, location, certification, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg max-h-[400px] overflow-y-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-[#0b1320] text-gray-400 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">NAME</th>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">VENDOR</th>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">SITE</th>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">HOME DISTRICT</th>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">CERT</th>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">AGE</th>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">QUALIFICATION</th>
                <th className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase">DEPT</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {mockData.filter(person => 
                person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                person.district.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((person, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 whitespace-nowrap font-bold text-gray-900 text-xs">{person.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs font-semibold">{person.vendor}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs font-semibold">{person.site}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.district}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${getCertStyle(person.cert)}`}>
                      {person.cert}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.age}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.qual}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8; 
        }
      `}</style>
    </div>
  );
};

export default DashboardWorkflow;
