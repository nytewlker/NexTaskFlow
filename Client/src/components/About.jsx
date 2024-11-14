import React from "react";

const AboutTaskManager = ({ darkMode }) => {
  return (
    <div
      id="about"
      className={`flex flex-col md:flex-row items-center justify-between px-8 py-12 min-h-screen`}
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:flex lg:items-center lg:space-x-12">
        
        {/* Left Section: Mission Statement */}
        <div className="lg:w-1/2 space-y-6 mb-8 lg:mb-0">
          <h2 className="text-4xl font-bold">
            Take control of your projects with <span className="text-blue-400">TaskFlow</span> - Your ultimate productivity companion.
          </h2>
          <p className="text-lg">
            At TaskFlow, our mission is to streamline task management for teams and individuals, making project tracking effortless and boosting productivity.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <a href="#contact" className="text-blue-500 hover:text-blue-800">
              Contact Support
            </a>
          </div>
        </div>

        {/* Right Section: Key Metrics */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-semibold">20k+</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">Over 20,000 tasks completed by our users.</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">1,500+</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">More than 1,500 projects successfully tracked.</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">99.9%</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">Uptime for a reliable task management experience.</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">24/7</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">Support available anytime to help you stay on track.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTaskManager;
