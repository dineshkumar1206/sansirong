import React, { useState } from 'react';

const AddRequirementModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    vendor: 'SAEJONG',
    cmSite: 'YUZHAN',
    role: 'OSS Engineer',
    numRequirements: 1,
    skillLevel: 'L0',
    checkPointDate: '',
    salaryRange: '',
    raisedBy: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we could handle submission to an API
    console.log('Submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111827] w-full max-w-2xl rounded-2xl border border-gray-700 shadow-2xl flex flex-col font-sans">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <h2 className="text-[#29b6f6] text-lg font-bold flex items-center">
            <span className="mr-2 text-xl leading-none">+</span> New Manpower Requirement
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* VENDOR */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Vendor</label>
                <select 
                  name="vendor" 
                  value={formData.vendor} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                >
                  <option>SAEJONG</option>
                  <option>ASM</option>
                  <option>TEAL</option>
                  <option>LUSTER</option>
                  <option>INDO-MIM</option>
                  <option>WOW TOP</option>
                  <option>CEAT</option>
                  <option>BSC</option>
                  <option>JAXIS</option>
                  <option>ALLEGRO</option>
                  <option>Other</option>
                </select>
              </div>

              {/* CM SITE */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">CM Site</label>
                <select 
                  name="cmSite" 
                  value={formData.cmSite} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                >
                  <option>YUZHAN</option>
                  <option>FXBL</option>
                  <option>FIT</option>
                  <option>TEHR</option>
                  <option>FXCN</option>
                  <option>TESS</option>
                  <option>PTI</option>
                  <option>CEAT</option>
                  <option>DELHI</option>
                  <option>WOWTEK</option>
                  <option>Other</option>
                </select>
              </div>

              {/* ROLE */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Role</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                >
                  <option>OSS Engineer</option>
                  <option>PLC Engineer</option>
                  <option>Automation Engineer</option>
                  <option>Technician</option>
                  <option>Other</option>
                </select>
              </div>

              {/* NO. OF REQUIREMENTS */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">No. of Requirements</label>
                <input 
                  type="number" 
                  name="numRequirements" 
                  value={formData.numRequirements} 
                  onChange={handleChange}
                  min="1"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>

              {/* SKILL LEVEL */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Skill Level</label>
                <select 
                  name="skillLevel" 
                  value={formData.skillLevel} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                >
                  <option>L0</option>
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
                  <option>Any</option>
                </select>
              </div>

              {/* CHECK-POINT DATE */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Check-Point Date</label>
                <input 
                  type="date" 
                  name="checkPointDate" 
                  value={formData.checkPointDate} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>

              {/* SALARY RANGE */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Salary Range</label>
                <input 
                  type="text" 
                  name="salaryRange" 
                  value={formData.salaryRange} 
                  onChange={handleChange}
                  placeholder="e.g. 25k - 35k / month"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full placeholder-gray-400"
                />
              </div>

              {/* RAISED BY */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Raised By</label>
                <input 
                  type="text" 
                  name="raisedBy" 
                  value={formData.raisedBy} 
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full placeholder-gray-400"
                />
              </div>

            </div>

            {/* NOTES */}
            <div className="flex flex-col mt-4">
              <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange}
                placeholder="Any specifics — shift, location, urgency..."
                className="bg-white text-black p-3 rounded-md border-none outline-none font-medium text-sm w-full h-24 resize-none placeholder-gray-400"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-800">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-sm font-bold bg-white text-gray-800 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-[#29b6f6] to-[#0288d1] text-white hover:opacity-90 transition-opacity shadow-md"
              >
                Save & Notify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRequirementModal;
