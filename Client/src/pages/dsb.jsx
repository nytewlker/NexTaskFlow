import { useState } from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-white shadow-md">
        <div className="text-xl font-semibold mb-4">iotask</div>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">
            Dashboard
          </a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">
            Projects
          </a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">
            Tasks
          </a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">
            Kanban Desk
          </a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">
            Calendar
          </a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">
            Contacts
          </a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">
            All Apps
          </a>
        </nav>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-500">Latest Projects</h3>
          <ul className="mt-2 space-y-1">
            <li className="text-sm text-gray-600">UI/UX Inspiration</li>
            <li className="text-sm text-gray-600">Theme Development</li>
            <li className="text-sm text-gray-600">Campaign Design</li>
            <li className="text-sm text-gray-600">Content Creation</li>
            <li className="text-sm text-gray-600">SaaS Template Design</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <input
            type="text"
            placeholder="Search for tasks and etc."
            className="p-2 border rounded-md border-gray-300"
          />
        </header>

        {/* Tasks Overview */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-sm font-semibold text-gray-500">New tasks</h3>
            <p className="text-2xl font-semibold">345</p>
            <div className="mt-2 h-1 w-full bg-green-200 rounded-md">
              <div className="h-1 bg-green-500 rounded-md" style={{ width: "70%" }}></div>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-sm font-semibold text-gray-500">Tasks done</h3>
            <p className="text-2xl font-semibold">128</p>
            <div className="mt-2 h-1 w-full bg-blue-200 rounded-md">
              <div className="h-1 bg-blue-500 rounded-md" style={{ width: "40%" }}></div>
            </div>
          </div>
        </div>

        {/* Tasks and Events */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-sm font-semibold text-gray-500">Pending tasks</h3>
            <p className="text-sm text-gray-700 mt-2">Design search page</p>
            <p className="text-xs text-gray-500">Due date: 08 Dec 2024</p>
            <div className="flex items-center mt-2">
              <img src="avatar1.jpg" alt="Avatar" className="h-6 w-6 rounded-full" />
              <img src="avatar2.jpg" alt="Avatar" className="h-6 w-6 rounded-full -ml-2" />
              {/* Add more avatars as needed */}
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-sm font-semibold text-gray-500">Upcoming events</h3>
            <p className="text-sm text-gray-700 mt-2">Meeting about website design</p>
            <p className="text-xs text-gray-500">Event date: 14 Dec 2024</p>
            <div className="flex items-center mt-2">
              <img src="avatar3.jpg" alt="Avatar" className="h-6 w-6 rounded-full" />
              <img src="avatar4.jpg" alt="Avatar" className="h-6 w-6 rounded-full -ml-2" />
              {/* Add more avatars as needed */}
            </div>
          </div>
        </div>

        {/* Latest Activity */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Latest Activity</h3>
          <ul className="mt-4 space-y-2">
            <li className="p-4 bg-white shadow rounded-md flex justify-between">
              <span>Loretta added 3 sub-tasks</span>
              <span className="text-xs text-gray-500">10 mins ago</span>
            </li>
            <li className="p-4 bg-white shadow rounded-md flex justify-between">
              <span>Richard created a new project</span>
              <span className="text-xs text-gray-500">10 mins ago</span>
            </li>
            {/* Add more activity items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
