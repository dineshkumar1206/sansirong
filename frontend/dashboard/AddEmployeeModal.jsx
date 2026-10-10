import config from '../src/config';
import React, { useState } from 'react';

const AddEmployeeModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    sipl_id_no: '',
    vendor: 'SAEJONG',
    cm_site: 'YUZHAN',
    age: '',
    gender: 'Male',
    qualification: '',
    doj: '',
    experience: '',
    mobile_number: '',
    department: '',
    permanent_district: '',
    blood_group: '',
    mail_id: ''
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name) {
      setError('Name is required.');
      return;
    }
    
    if (!formData.sipl_id_no) {
      setError('SIPL ID is required.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get the token if it exists (auth mechanism might vary)
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${config.API_BASE_URL}/api/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add employee');
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000); // Wait 2s for animation to finish
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.5)] scale-in-center">
              <svg className="w-12 h-12 text-white animate-[draw_0.6s_ease-out_forwards]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" strokeDasharray="50" strokeDashoffset="50" style={{ animation: "draw 0.5s ease-out forwards 0.2s" }} />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide">Added Successfully!</h3>
            
            <style>{`
              @keyframes draw { to { stroke-dashoffset: 0; } }
              .scale-in-center { animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
              @keyframes scale-in-center { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
            `}</style>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800/80 bg-gray-900/50">
          <h2 className="text-emerald-400 text-xl font-extrabold flex items-center tracking-wide">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 shadow-inner">
              <span className="text-emerald-400 text-xl leading-none">+</span>
            </div>
            Add Employee
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
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* NAME */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Name*</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner"
                />
              </div>

              {/* SIPL ID */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">SIPL ID*</label>
                <input 
                  type="text" 
                  name="sipl_id_no" 
                  value={formData.sipl_id_no} 
                  onChange={handleChange}
                  placeholder="SAN..."
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all placeholder-gray-600 shadow-inner"
                />
              </div>

              {/* VENDOR */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Vendor</label>
                <select 
                  name="vendor" 
                  value={formData.vendor} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner appearance-none"
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
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">CM Site</label>
                <select 
                  name="cm_site" 
                  value={formData.cm_site} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner appearance-none"
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

              {/* AGE */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange}
                  min="18"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner"
                />
              </div>

              {/* GENDER */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner appearance-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* QUALIFICATION */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Qualification</label>
                <input 
                  type="text" 
                  name="qualification" 
                  value={formData.qualification} 
                  onChange={handleChange}
                  placeholder="e.g. B.E MECH"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all placeholder-gray-600 shadow-inner"
                />
              </div>

              {/* DATE OF JOINING */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Date of Joining</label>
                <input 
                  type="date" 
                  name="doj" 
                  value={formData.doj} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-gray-300 px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner [color-scheme:dark]"
                />
              </div>

              {/* EXPERIENCE */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Experience</label>
                <input 
                  type="text" 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange}
                  placeholder="e.g. 2 years"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all placeholder-gray-600 shadow-inner"
                />
              </div>

              {/* MOBILE */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Mobile</label>
                <input 
                  type="text" 
                  name="mobile_number" 
                  value={formData.mobile_number} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner"
                />
              </div>

              {/* DEPARTMENT */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Department</label>
                <input 
                  type="text" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange}
                  placeholder="e.g. FATP"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all placeholder-gray-600 shadow-inner"
                />
              </div>

              {/* HOME DISTRICT */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Home District</label>
                <input 
                  type="text" 
                  name="permanent_district" 
                  value={formData.permanent_district} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner"
                />
              </div>
              
              {/* BLOOD GROUP */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Blood Group</label>
                <input 
                  type="text" 
                  name="blood_group" 
                  value={formData.blood_group} 
                  onChange={handleChange}
                  placeholder="e.g. O+"
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all placeholder-gray-600 shadow-inner"
                />
              </div>
              
              {/* EMAIL */}
              <div className="flex flex-col group">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1.5 group-focus-within:text-emerald-400 transition-colors">Email</label>
                <input 
                  type="email" 
                  name="mail_id" 
                  value={formData.mail_id} 
                  onChange={handleChange}
                  className="bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-gray-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium text-sm w-full transition-all shadow-inner"
                />
              </div>

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
                className="group relative px-8 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-400 hover:to-green-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-50 overflow-hidden"
                disabled={isSubmitting}
              >
                <span className={`flex items-center justify-center transition-all ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Add to Sheet
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

export default AddEmployeeModal;
