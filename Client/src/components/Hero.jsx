import React from "react";
import Auth from "./Auth"; // Import the Auth component
import { motion } from "framer-motion"; // For animations

const TaskManagerHero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 min-h-screen bg-gradient-to-br">
      {/* Left Section */}
      <motion.div
        className="md:w-1/2 space-y-6 text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Welcome to <span className="text-blue-400">NexTaskFlow</span>
          <br />
          Manage Your Tasks Effortlessly
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Organize, track, and manage your tasks with ease. Stay productive and
          never miss a deadline again!
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
          aria-label="Explore our Task Manager features"
        >
          <span>📋 Explore how we simplify task management</span>
        </motion.button>

        {/* Metrics */}
        <div className="flex space-x-8 pt-6">
          {[
            { value: "10k+", label: "Tasks Managed" },
            { value: "5k+", label: "Projects Completed" },
            { value: "99%", label: "User Satisfaction" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index *  0.2}}
            >
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="md:w-1/3 p-6 rounded-lg mt-8 md:mt-0 shadow-lg bg-indigo-100 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold mb-4">
          Sign up today to start managing your tasks
        </h2>

        {/* Google Social Login Button */}
        <Auth />
      </motion.div>
    </div>
  );
};

export default TaskManagerHero;
