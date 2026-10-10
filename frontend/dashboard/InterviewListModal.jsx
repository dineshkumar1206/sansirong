import config from '../src/config';
import React, { useState, useEffect } from 'react';

const InterviewListModal = ({ isOpen, onClose, stats }) => {
  const [interviews, setInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch(`${config.API_BASE_URL}/api/interviews`)
        .then(res => res.json())
        .then(data => {
          setInterviews(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch interview list', err);
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredInterviews = interviews.filter(interview => {
    const term = searchTerm.toLowerCase();
    return (
      (interview.name && interview.name.toLowerCase().includes(term)) ||
      (interview.status && interview.status.toLowerCase().includes(term)) ||
      (interview.previous_organization && interview.previous_organization.toLowerCase().includes(term)) ||
      (interview.comment && interview.comment.toLowerCase().includes(term)) ||
      (interview.technical_knowledge && interview.technical_knowledge.toLowerCase().includes(term))
    );
  });

  const getTechColor = (tech) => {
    if (!tech) return 'text-gray-400';
    const t = tech.toLowerCase();
    if (t.includes('good') || t.includes('excellent') || t.includes('high')) return 'text-green-500';
    if (t.includes('avg') || t.includes('average')) return 'text-blue-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-all duration-300" onClick={onClose}>
      <div 
        className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] w-full max-w-7xl rounded-2xl border border-gray-700/50 shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-[90vh] transform transition-all"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-800/80 bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shadow-inner border border-blue-500/30">
              <span className="text-blue-400 text-lg">📋</span>
            </div>
            <h2 className="text-blue-400 font-extrabold text-xl tracking-wide">Interview List</h2>
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs px-3 py-1 rounded-full font-bold shadow-sm">
              {stats.totalCandidates} Total
            </span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 p-5 bg-gray-900/30">
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center shadow-inner flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
            <div className="font-mono text-3xl font-black text-gray-200">{stats.totalCandidates}</div>
            <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1">Candidates</div>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4 text-center shadow-inner flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
            <div className="font-mono text-3xl font-black text-emerald-400">{stats.ratedGood}</div>
            <div className="text-[10px] font-bold text-emerald-500/80 tracking-widest uppercase mt-1">Rated Good</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4 text-center shadow-inner flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
            <div className="font-mono text-3xl font-black text-orange-400">{stats.joined}</div>
            <div className="text-[10px] font-bold text-orange-500/80 tracking-widest uppercase mt-1">Joined</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 text-center shadow-inner flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
            <div className="font-mono text-3xl font-black text-blue-400">
              {(stats.techRatingMix?.average || 0) + (stats.techRatingMix?.low || 0)}
            </div>
            <div className="text-[10px] font-bold text-blue-500/80 tracking-widest uppercase mt-1">Avg / Low</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-4 bg-gray-900/50 border-y border-gray-800/80">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="text"
              className="w-full bg-gray-800/80 text-gray-200 rounded-xl pl-12 pr-4 py-3 border border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner placeholder-gray-500"
              placeholder="Search by name, status, organisation or comment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-hidden bg-gray-900/20 p-5 flex flex-col custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-full text-blue-400 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <span className="font-semibold tracking-widest uppercase text-xs animate-pulse">Loading Interview Data...</span>
            </div>
          ) : (
            <div className="flex-1 bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-auto shadow-inner custom-scrollbar relative">
              <table className="w-full min-w-[2500px] text-left text-sm text-gray-300 whitespace-nowrap">
                <thead className="text-xs text-gray-400 uppercase bg-gray-900/80 sticky top-0 backdrop-blur-sm z-10">
                  <tr>
                    <th className="px-5 py-4 font-bold tracking-wider w-[50px]">#</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[120px]">Date</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[250px]">Name</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Contact</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[120px]">Int. Date</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Location</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Tech</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[200px]">Prev. Org</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Exp</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Current Sal</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Expected Sal</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Notice Period</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[150px]">Referred By</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[100px]">Resume</th>
                    <th className="px-5 py-4 font-bold tracking-wider w-[200px]">Status</th>
                    <th className="px-5 py-4 font-bold tracking-wider min-w-[300px]">Comment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredInterviews.length > 0 ? (
                    filteredInterviews.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-gray-700/30 transition-colors group">
                        <td className="px-5 py-4 text-gray-500 font-mono">{index + 1}</td>
                        <td className="px-5 py-4 text-gray-400 font-mono text-xs">{item.date || '-'}</td>
                        <td className="px-5 py-4 font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                          <div>{item.name || '-'}</div>
                          {item.email_id && <div className="text-xs text-gray-500 font-normal mt-0.5">{item.email_id}</div>}
                        </td>
                        <td className="px-5 py-4 text-gray-400 font-mono text-xs">{item.contact_number || '-'}</td>
                        <td className="px-5 py-4 text-gray-400 font-mono text-xs">{item.interview_date || '-'}</td>
                        <td className="px-5 py-4 text-gray-400">{item.location || '-'}</td>
                        <td className={`px-5 py-4 font-bold ${getTechColor(item.technical_knowledge)}`}>
                          <span className="bg-gray-900/50 px-2 py-1 rounded-md border border-gray-700/50 shadow-inner">
                            {item.technical_knowledge || '-'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs truncate max-w-[200px]" title={item.previous_organization}>{item.previous_organization || '-'}</td>
                        <td className="px-5 py-4 text-gray-400">{item.experience || '-'}</td>
                        <td className="px-5 py-4 text-gray-400 font-mono text-xs">{item.current_salary || '-'}</td>
                        <td className="px-5 py-4 text-gray-400 font-mono text-xs">{item.expected_salary || '-'}</td>
                        <td className="px-5 py-4 text-gray-400">{item.notice_period || '-'}</td>
                        <td className="px-5 py-4 text-gray-400 text-xs truncate max-w-[150px]" title={item.referred_by}>{item.referred_by || '-'}</td>
                        <td className="px-5 py-4">
                          {item.resume_link && item.resume_link !== '-' && item.resume_link !== 'null' ? (
                            <a href={item.resume_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline text-xs font-semibold">
                              Link
                            </a>
                          ) : (
                            <span className="text-gray-600 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 bg-gray-700/50 px-2 py-1 rounded">
                            {item.status || '-'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-400 italic max-w-xs truncate" title={item.comment}>{item.comment || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-5 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-12 h-12 mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <span className="text-sm font-semibold tracking-wide">No interviews found matching your search.</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewListModal;
