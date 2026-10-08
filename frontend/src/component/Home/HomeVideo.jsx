import React from 'react';

const HomeVideo = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center bg-transparent">
      <div className="w-full mb-8 text-center">
        <p className="text-[#d32f2f] text-sm font-bold tracking-[0.2em] uppercase mb-2">Corporate Profile</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Sansirong International Private Limited</h2>
      </div>
      <video 
        src="/video/sansirong-pvt.mp4" 
        controls 
        className="w-full rounded-xl shadow-lg bg-transparent"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomeVideo;
