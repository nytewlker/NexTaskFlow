import { useState } from "react";

const ProjectDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-white shadow-md">
        <div className="text-xl font-semibold mb-4">iotask</div>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">Dashboard</a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">Projects</a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">Tasks</a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">Kanban Desk</a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">Calendar</a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">Contacts</a>
          <a href="#" className="block p-2 rounded-md text-gray-600 hover:bg-blue-50">All Apps</a>
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">All Projects</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 border rounded-md border-gray-300">Sort</button>
            <button className="p-2 border rounded-md border-gray-300">Status</button>
            <button className="p-2 border rounded-md bg-blue-500 text-white">Add New Project</button>
          </div>
        </header>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {/* Placeholder for project icon */}
                </div>
                <button className="text-gray-500">...</button>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Project Title {index + 1}</h3>
              <p className="text-sm text-gray-500 mb-2">Due date: 11 Oct 2024</p>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">Development</span>
              <div className="flex items-center mt-2 space-x-2">
                {/* Team avatars */}
                <img src="avatar1.jpg" alt="Avatar" className="h-6 w-6 rounded-full" />
                <img src="avatar2.jpg" alt="Avatar" className="h-6 w-6 rounded-full -ml-2" />
                <img src="avatar3.jpg" alt="Avatar" className="h-6 w-6 rounded-full -ml-2" />
                <span className="text-xs text-gray-500">+3</span>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
                <div className="h-1 bg-green-500 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button className="text-blue-500">Prev</button>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <button key={index} className={`px-2 py-1 rounded-md ${index === 1 ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <button className="text-blue-500">Next</button>
        </div>
      </main>
    </div>
  );
};

export default ProjectDashboard;
