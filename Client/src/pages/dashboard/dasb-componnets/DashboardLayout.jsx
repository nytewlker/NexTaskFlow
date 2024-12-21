import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from '../../../components/SideBar';
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

const DashboardLayout = ({ darkMode, setDarkMode, user, handleLogout }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-shrink-0">
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          user={user} 
          handleLogout={handleLogout} 
        />
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed width */}
        <aside className="w-64 mt-28 flex-shrink-0 overflow-y-auto">
          <Sidebar />
        </aside>
        {/* Main content area with remaining space */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default DashboardLayout;
