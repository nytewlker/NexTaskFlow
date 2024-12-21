import React from 'react';

const Dashboard = () => {
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Complete the project documentation.",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Prepare the presentation slides.",
      status: "Pending",
      priority: "Medium",
      dueDate: "2024-01-20",
    },
    // Add more tasks as needed
  ];

  return (
    <div className="min-h-screen rounded-lg py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="rounded-md bg-opacity-50 dark:bg-opacity-50 bg-white dark:bg-gray-800 shadow p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-lg sm:text-xl font-semibold">
            Manage Your Tasks Efficiently with <span className="text-blue-600">NextTask Flow</span>
          </h1>
        </div>
        {/* Task Filters */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Task name or keyword..."
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button className="px-4 py-2 rounded bg-blue-500 text-white">
            Filter
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col py-6 rounded-lg lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 p-4 py-5 bg-opacity-50 dark:bg-opacity-50 rounded-md bg-white dark:bg-gray-800 border-b lg:border-b-0 lg:border-r dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          {/* Filters Section */}
          <div className="mb-4">
            <h3 className="font-medium">Priority</h3>
            <ul className="space-y-1">
              <li><input type="checkbox" /> <span>High</span></li>
              <li><input type="checkbox" /> <span>Medium</span></li>
              <li><input type="checkbox" /> <span>Low</span></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Status</h3>
            <ul className="space-y-1">
              <li><input type="checkbox" /> <span>Pending</span></li>
              <li><input type="checkbox" /> <span>In Progress</span></li>
              <li><input type="checkbox" /> <span>Completed</span></li>
            </ul>
          </div>
        </aside>

        {/* Task List */}
        <main className="w-full lg:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow flex flex-col space-y-2"
              >
                <div>
                  <h3 className="text-md font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                  <div className="mt-2 flex space-x-2 text-sm">
                    <span className={`px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                      {task.priority}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                      {task.status}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 rounded bg-blue-500 text-white">
                    Edit
                  </button>
                  <button className="px-4 py-2 rounded bg-green-500 text-white">
                    Mark Complete
                  </button>
                  <button className="px-4 py-2 rounded bg-red-500 text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
