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
      
      alert(data.message || 'Employee added successfully!');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111827] w-full max-w-2xl rounded-2xl border border-gray-700 shadow-2xl flex flex-col font-sans max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <h2 className="text-green-500 text-lg font-bold flex items-center">
            <span className="mr-2 text-xl leading-none">+</span> Add Employee to Master Data
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
        <div className="p-6 overflow-y-auto">
          {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded text-sm font-semibold">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* NAME */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Name*</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>

              {/* SIPL ID */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">SIPL ID</label>
                <input 
                  type="text" 
                  name="sipl_id_no" 
                  value={formData.sipl_id_no} 
                  onChange={handleChange}
                  placeholder="SAN..."
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full placeholder-gray-400"
                />
              </div>

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
                  name="cm_site" 
                  value={formData.cm_site} 
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

              {/* AGE */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange}
                  min="18"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>

              {/* GENDER */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* QUALIFICATION */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Qualification</label>
                <input 
                  type="text" 
                  name="qualification" 
                  value={formData.qualification} 
                  onChange={handleChange}
                  placeholder="e.g. B.E MECH / DIPLOMA EEE"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full placeholder-gray-400"
                />
              </div>

              {/* DATE OF JOINING */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Date of Joining</label>
                <input 
                  type="date" 
                  name="doj" 
                  value={formData.doj} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>

              {/* EXPERIENCE */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Experience</label>
                <input 
                  type="text" 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange}
                  placeholder="e.g. 2 years"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full placeholder-gray-400"
                />
              </div>

              {/* MOBILE */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Mobile</label>
                <input 
                  type="text" 
                  name="mobile_number" 
                  value={formData.mobile_number} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>

              {/* DEPARTMENT */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Department</label>
                <input 
                  type="text" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange}
                  placeholder="e.g. FATP"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full placeholder-gray-400"
                />
              </div>

              {/* HOME DISTRICT */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Home District</label>
                <input 
                  type="text" 
                  name="permanent_district" 
                  value={formData.permanent_district} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>
              
              {/* BLOOD GROUP */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Blood Group</label>
                <input 
                  type="text" 
                  name="blood_group" 
                  value={formData.blood_group} 
                  onChange={handleChange}
                  placeholder="e.g. O+"
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full placeholder-gray-400"
                />
              </div>
              
              {/* EMAIL */}
              <div className="flex flex-col">
                <label className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Email</label>
                <input 
                  type="email" 
                  name="mail_id" 
                  value={formData.mail_id} 
                  onChange={handleChange}
                  className="bg-white text-black p-2.5 rounded-md border-none outline-none font-medium text-sm w-full"
                />
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-800">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-sm font-bold bg-white text-gray-800 hover:bg-gray-100 transition-colors shadow-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2.5 rounded-lg text-sm font-bold bg-[#0f9d58] text-white hover:bg-[#0b8043] transition-colors shadow-md disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add to Sheet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
