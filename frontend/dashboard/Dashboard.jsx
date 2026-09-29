import React from 'react';
import DashboardHero from './DashboardHero';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f9]">
      <DashboardHero />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
