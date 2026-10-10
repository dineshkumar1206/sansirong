import config from '../src/config';
import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const getCertStyle = (cert) => {
  switch (cert) {
    case 'L1': return 'bg-gray-200 text-gray-700 shadow-sm';
    case 'L2': return 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200';
    case 'L3': return 'bg-red-100 text-red-700 shadow-sm border border-red-200';
    default: return 'bg-gray-100 text-gray-400';
  }
};

const DashboardWorkflow = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/employees`);
        if (res.ok) {
          const data = await res.json();
          setEmployees(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(person => 
    (person.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (person.permanent_district || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (person.vendor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (person.cm_site || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-8 md:px-16 pb-12 relative font-sans">
      <div className="flex items-center mb-4" data-aos="fade-right">
        <h2 className="text-[#d32f2f] text-xs font-extrabold tracking-widest uppercase flex items-center">
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#d32f2f] mr-2"></span> WORKFORCE DIRECTORY
        </h2>
      </div>

      <div 
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden p-6 relative"
        data-aos="fade-up"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
        
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center">
               <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-red-700 mr-2 rounded-full"></div>
               <h3 className="text-gray-900 text-sm font-black tracking-widest uppercase flex items-center">
                 ENGINEERS <span className="ml-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">{employees.length}</span>
               </h3>
            </div>
            <p className="text-gray-400 text-[10px] font-medium mt-2">
              Click any vendor, CM site, or matrix cell above to drill in - click a person to see their full profile
            </p>
          </div>
          
          <div className="relative w-full md:w-80 group/search" data-aos="zoom-in" data-aos-delay="100">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 text-lg group-focus-within/search:text-[#d32f2f] transition-colors duration-300" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#d32f2f] focus:bg-white text-gray-700 placeholder-gray-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
              placeholder="Search by name, location, cert..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100 max-h-[400px] overflow-y-auto custom-scrollbar shadow-inner" data-aos="fade-up" data-aos-delay="200">
          <table className="min-w-full divide-y divide-gray-100 text-left text-sm relative">
            <thead className="bg-[#0b1320] text-gray-300 sticky top-0 z-10 backdrop-blur-md bg-opacity-95">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">NAME</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">VENDOR</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">SITE</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">HOME DISTRICT</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">CERT</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">AGE</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">QUALIFICATION</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase">DEPT</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {filteredEmployees.map((person, index) => (
                <tr 
                  key={index} 
                  onClick={() => setSelectedEmployee(person)}
                  className="hover:bg-red-50/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group/row relative"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 text-xs group-hover/row:text-[#d32f2f] transition-colors">{person.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-xs font-semibold">{person.vendor || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-xs font-semibold">{person.cm_site || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">{person.permanent_district || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-[10px] font-bold ${getCertStyle(person.level || '-')}`}>
                      {person.level || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">{person.age || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">{person.qualification || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">{person.department || '-'}</td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                 <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-400 text-sm font-medium">
                        No employees found matching your search.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineer Profile Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
             className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
             onClick={() => setSelectedEmployee(null)}
          ></div>
          <div 
             className="bg-white w-[550px] max-w-[95%] rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col"
             data-aos="zoom-in"
             data-aos-duration="300"
          >
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex justify-between items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2">{selectedEmployee.name}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm border border-red-400">
                    {selectedEmployee.vendor || 'N/A'}
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md">
                    {selectedEmployee.cm_site || 'N/A'}
                  </span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getCertStyle(selectedEmployee.level || '-')}`}>
                    {selectedEmployee.level || 'L0'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/20 p-2 rounded-full transition-all relative z-10"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 bg-gray-50/50">
              <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                 <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                 Personal Details
              </h4>
              
              {/* Detail Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">SIPL ID</div>
                  <div className="text-sm font-bold text-gray-800">{selectedEmployee.sipl_id_no || '-'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">AGE</div>
                  <div className="text-sm font-bold text-gray-800">{selectedEmployee.age || '-'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">EXPERIENCE</div>
                  <div className="text-sm font-bold text-gray-800">{selectedEmployee.experience || '-'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">DATE OF JOINING</div>
                  <div className="text-sm font-bold text-gray-800">{selectedEmployee.doj || '-'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">QUALIFICATION</div>
                  <div className="text-sm font-bold text-gray-800">{selectedEmployee.qualification || '-'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">DEPARTMENT</div>
                  <div className="text-sm font-bold text-gray-800">{selectedEmployee.department || '-'}</div>
                </div>
                
                {/* Expandable detailed section if needed */}
                <div className="col-span-2 mt-2">
                   <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                     Location & Contact
                   </h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">HOME DISTRICT</div>
                        <div className="text-xs font-semibold text-gray-700">{selectedEmployee.permanent_district || '-'}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">MOBILE</div>
                        <div className="text-xs font-semibold text-gray-700">{selectedEmployee.mobile_number || '-'}</div>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end pt-4 border-t border-gray-200">
                <button className="group relative flex items-center justify-center px-6 py-2.5 font-bold text-white bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all active:scale-95">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative text-sm">Mark as Exited</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
};

export default DashboardWorkflow;
