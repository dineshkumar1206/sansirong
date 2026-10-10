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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000); // Wait 2s for animation to finish
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-all duration-300">
      <div 
        className="bg-gradient-to-br from-[#111827] to-[#1f2937] w-full max-w-2xl rounded-2xl border border-gray-700/50 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col font-sans max-h-[90vh] relative overflow-hidden transform transition-all"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Success Overlay Animation */}
        {showSuccess && (
          <div className="absolute inset-0 z-50 bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-in-center">
              <svg className="w-12 h-12 text-white animate-[draw_0.6s_ease-out_forwards]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" strokeDasharray="50" strokeDashoffset="50" style={{ animation: "draw 0.5s ease-out forwards 0.2s" }} />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide">Requirement Added!</h3>
            
            <style>{`
              @keyframes draw { to { stroke-dashoffset: 0; } }
              .scale-in-center { animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
              @keyframes scale-in-center { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
            `}</style>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800/80 bg-gray-900/50">
          <h2 className="text-blue-400 text-xl font-extrabold flex items-center tracking-wide">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 shadow-inner">
              <span className="text-blue-400 text-xl leading-none">+</span>
            </div>
            New Requirement
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* VENDOR */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">Vendor</label>
                <select 
                  name="vendor" 
                  value={formData.vendor} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all shadow-inner appearance-none"
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
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">CM Site</label>
                <select 
                  name="cmSite" 
                  value={formData.cmSite} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all shadow-inner appearance-none"
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
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">Role</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all shadow-inner appearance-none"
                >
                  <option>OSS Engineer</option>
                  <option>PLC Engineer</option>
                  <option>Automation Engineer</option>
                  <option>Technician</option>
                  <option>Other</option>
                </select>
              </div>

              {/* NO. OF REQUIREMENTS */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">No. of Requirements</label>
                <input 
                  type="number" 
                  name="numRequirements" 
                  value={formData.numRequirements} 
                  onChange={handleChange}
                  min="1"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all shadow-inner"
                />
              </div>

              {/* SKILL LEVEL */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">Skill Level</label>
                <select 
                  name="skillLevel" 
                  value={formData.skillLevel} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all shadow-inner appearance-none"
                >
                  <option>L0</option>
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
                  <option>Any</option>
                </select>
              </div>

              {/* CHECK-POINT DATE */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">Check-Point Date</label>
                <input 
                  type="date" 
                  name="checkPointDate" 
                  value={formData.checkPointDate} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-gray-300 px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all shadow-inner [color-scheme:dark]"
                />
              </div>

              {/* SALARY RANGE */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">Salary Range</label>
                <input 
                  type="text" 
                  name="salaryRange" 
                  value={formData.salaryRange} 
                  onChange={handleChange}
                  placeholder="e.g. 25k - 35k / month"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all placeholder-gray-600 shadow-inner"
                />
              </div>

              {/* RAISED BY */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">Raised By</label>
                <input 
                  type="text" 
                  name="raisedBy" 
                  value={formData.raisedBy} 
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full transition-all placeholder-gray-600 shadow-inner"
                />
              </div>

            </div>

            {/* NOTES */}
            <div className="flex flex-col group mt-4">
              <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-blue-400 transition-colors">Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange}
                placeholder="Any specifics — shift, location, urgency..."
                className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-sm w-full h-24 resize-none transition-all placeholder-gray-600 shadow-inner"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-800/80 bg-gray-900/30 -mx-6 -mb-6 p-6">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all shadow-sm border border-gray-700"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="group relative px-8 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-400 hover:to-blue-600 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:opacity-50 overflow-hidden"
                disabled={isSubmitting}
              >
                <span className={`flex items-center justify-center transition-all ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Save & Notify
                </span>
                
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRequirementModal;
