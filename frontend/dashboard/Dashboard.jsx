import React from 'react';
import DashboardHero from './DashboardHero';
import DashboardContent from './DashboardContent';
import DashboardSkill from './DashboardSkill';
import DashboardChart1 from './DashboardChart-1';
import DashboardWorkflow from './DashboardWorkflow';
import DashboardLevel from './DashboardLevel';
import DashboardDemo from './Dashboard-Demo';
import DashboardGeography from './DashboardGeography';
import DashboardManpower from './DashboardManpower';
import DashboardInterview from './DashboardInterview';
import DashboardExits from './DashboardExits';
import DashboardBirthday from './DashboardBirthday';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f9]">
      <DashboardHero />
      <DashboardContent />
      <DashboardSkill />
      <DashboardChart1 />
      <DashboardWorkflow />
      <DashboardLevel />
      <DashboardDemo/>
      <DashboardGeography />
      <DashboardManpower/>   
      <DashboardInterview/>
      <DashboardExits />  
      <DashboardBirthday />
       </div>
  );
};

export default Dashboard;
