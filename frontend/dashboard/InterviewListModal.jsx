import React, { useState, useEffect } from 'react';

const InterviewListModal = ({ isOpen, onClose, stats }) => {
  const [interviews, setInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch('http://localhost:5000/api/interviews')
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div 
        className="bg-[#1e293b] w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-white">📋</span>
            <h2 className="text-white font-bold text-lg">Interview List</h2>
            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {stats.totalCandidates}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 p-4 bg-[#0f172a]">
          <div className="flex-1 bg-white rounded-lg p-3 text-center">
            <div className="font-mono text-2xl font-black text-gray-900">{stats.totalCandidates}</div>
            <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Candidates</div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3 text-center">
            <div className="font-mono text-2xl font-black text-green-600">{stats.ratedGood}</div>
            <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Rated Good</div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3 text-center">
            <div className="font-mono text-2xl font-black text-orange-500">{stats.joined}</div>
            <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Joined</div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3 text-center">
            <div className="font-mono text-2xl font-black text-blue-500">
              {(stats.techRatingMix?.average || 0) + (stats.techRatingMix?.low || 0)}
            </div>
            <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Avg / Low</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-[#1e293b]">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="text"
              className="w-full bg-white text-gray-900 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name, status, organisation or comment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto bg-[#1e293b] p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full text-white">Loading...</div>
          ) : (
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-[#0f172a] sticky top-0">
                <tr>
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Tech</th>
                  <th className="px-4 py-3 font-medium">Exp</th>
                  <th className="px-4 py-3 font-medium">Expected</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Comment</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterviews.length > 0 ? (
                  filteredInterviews.map((item, index) => (
                    <tr key={item.id || index} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-white">
                        <div>{item.name || '-'}</div>
                        {item.email_id && <div className="text-xs text-gray-500">{item.email_id}</div>}
                      </td>
                      <td className="px-4 py-3">{item.contact_number || '-'}</td>
                      <td className={`px-4 py-3 font-bold ${getTechColor(item.technical_knowledge)}`}>
                        {item.technical_knowledge || '-'}
                      </td>
                      <td className="px-4 py-3">{item.experience || '-'}</td>
                      <td className="px-4 py-3">{item.expected_salary || '-'}</td>
                      <td className="px-4 py-3">{item.status || '-'}</td>
                      <td className="px-4 py-3 text-xs">{item.comment || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No interviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewListModal;
