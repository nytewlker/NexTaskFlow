import React from "react";
import RecentActivity from "./RecentActivity"; // Ensure this path is correct

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
