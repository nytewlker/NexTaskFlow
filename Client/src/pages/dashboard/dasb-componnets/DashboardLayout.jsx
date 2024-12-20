import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from '../../../components/SideBar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed width */}
      <div className="py-20  w-64">
        <Sidebar />
      </div>

      {/* Main content area with remaining space */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
