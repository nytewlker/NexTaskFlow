import React from "react";
import RecentActivity from "./RecentActivity"; // Ensure this path is correct
import ProjectDashboard from "./Projects";
import TaskManager from "./task";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <RecentActivity />
      <ProjectDashboard/>
      <TaskManager />
    </div>
  );
};

export default Dashboard;
