import React from 'react';
import DashboardHero from './DashboardHero';
import DashboardContent from './DashboardContent';
import DashboardSkill from './DashboardSkill';
import DashboardChart1 from './DashboardChart-1';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f9]">
      <DashboardHero />
      <DashboardContent />
      <DashboardSkill />
      <DashboardChart1 />
    </div>
  );
};

export default Dashboard;
