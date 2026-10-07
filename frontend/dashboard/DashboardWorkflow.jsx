import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

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
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/employees');
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
    <div className="w-full px-8 md:px-16 pb-12 relative">
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
               ENGINEERS <span className="ml-3 bg-[#d32f2f] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">{employees.length}</span>
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
              {filteredEmployees.map((person, index) => (
                <tr 
                  key={index} 
                  onClick={() => setSelectedEmployee(person)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-3 whitespace-nowrap font-bold text-gray-900 text-xs">{person.name || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs font-semibold">{person.vendor || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs font-semibold">{person.cm_site || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.permanent_district || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${getCertStyle(person.level || '-')}`}>
                      {person.level || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.age || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.qualification || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600 text-xs">{person.department || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineer Profile Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#1e232e] w-[500px] max-w-[95%] rounded-xl shadow-2xl border border-gray-700 flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <h2 className="text-gray-300 font-bold tracking-wider">Engineer Profile</h2>
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-white transition"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-5">
              <div className="mb-5">
                <h3 className="text-2xl font-black text-white mb-2">{selectedEmployee.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d32f2f] text-white">
                    {selectedEmployee.vendor || 'N/A'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-gray-900 border border-gray-300">
                    {selectedEmployee.cm_site || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">SIPL ID</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.sipl_id_no || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">AGE</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.age || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">EXPERIENCE</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.experience || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">DATE OF JOINING</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.doj || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">QUALIFICATION</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.qualification || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">DEPARTMENT</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.department || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">GENDER</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.gender || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">BLOOD GROUP</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.blood_group || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">MARITAL STATUS</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.marital_status || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">RELIGION</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.religion || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">NATIONALITY</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.nationality || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">ACCOMMODATION</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.stay_category || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">HOME DISTRICT</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.permanent_district || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">HOME CITY</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.permanent_city || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">PRESENT DISTRICT</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.present_district || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">PRESENT CITY</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.present_city || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">BOARDING POINT</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.boarding_point || '-'}</div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">MOBILE</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.mobile_number || '-'}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">EMAIL</div>
                  <div className="text-sm font-semibold text-white">{selectedEmployee.mail_id || '-'}</div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-[#d32f2f] hover:bg-red-800 transition text-white text-sm font-bold py-2 px-6 rounded-lg shadow">
                  Mark as Exited
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

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
