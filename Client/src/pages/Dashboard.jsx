import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen rounded-lg py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className=" rounded-md bg-opacity-50 dark:bg-opacity-50 bg-white dark:bg-gray-800 shadow  p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-lg sm:text-xl font-semibold">
            There Are <span className="text-blue-600">93,178</span> Postings Here For You!
          </h1>
        </div>
        {/* Search Bar */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Job title, keywords..."
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="City, province..."
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option>All Categories</option>
          </select>
          <button className="px-4 py-2 rounded bg-blue-500 text-white">
            Search
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
            <h3 className="font-medium">Job Type</h3>
            <ul className="space-y-1">
              <li><input type="checkbox" /> <span>Full-Time</span></li>
              <li><input type="checkbox" /> <span>Part-Time</span></li>
            </ul>
          </div>
        </aside>

        {/* Job Listings */}
        <main className="w-full lg:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-md font-semibold">Job Title {index + 1}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Company Name - Location
                  </p>
                  <div className="mt-2 flex space-x-2 text-sm">
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                      Full-Time
                    </span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                      $60k - $80k
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded bg-blue-500 text-white">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
