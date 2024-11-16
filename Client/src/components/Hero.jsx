import React from "react";
import Auth from "./Auth"; // Import the Auth component

const TaskManagerHero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 min-h-screen">
      {/* Left Section */}
      <div className="md:w-1/2 space-y-6 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Welcome to <span className="text-blue-400">NexTaskFlow</span>  Manage Your Tasks Effortlessly
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Organize, track, and manage your tasks with ease. Stay productive and never miss a deadline again!
        </p>
        <button
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
          aria-label="Explore our Task Manager features"
        >
          <span>📋 Explore how we simplify task management</span>
        </button>

        {/* Metrics */}
        <div className="flex space-x-8 pt-6">
          <div>
            <h3 className="text-2xl font-bold">10k+</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Tasks Managed</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">5k+</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Projects Completed</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">99%</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">User Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/3 p-8 rounded-lg mt-6 md:mt-0 shadow-lg bg-slate-950 dark:bg-slate-800 bg-opacity-10 dark:bg-opacity-10">
        <h2 className="text-lg font-semibold mb-4">Sign up today to start managing your tasks</h2>

        {/* Google Social Login Button */}
        <Auth />
      </div>
    </div>
  );
};

export default TaskManagerHero;
