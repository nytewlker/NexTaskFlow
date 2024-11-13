import React from 'react';

function Dashboard() {
  return (
    <div className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
        />
        <span>Profile</span>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
          Employee Info
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
          Employee Availability
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
          Top Hiring Sources
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
          Top Performers
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
