import React from "react";
import Auth from "./Auth"; // Import the Auth component

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 min-h-screen">
      {/* Left Section */}
      <div className="md:w-1/2 space-y-6 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Welcome to <span className="text-blue-400">ShopFlow</span> - Your Ultimate Online Store
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Explore the best products in technology, fashion, home goods, and more. Find what you love at unbeatable prices!
        </p>
        <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-400">
          <span>🎥 Watch how we deliver excellence</span>
        </button>

        {/* Metrics */}
        <div className="flex space-x-8 pt-6">
          <div>
            <h3 className="text-2xl font-bold">500k+</h3>
            <p className=" text-gray-700 dark:text-gray-300 text-sm">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">1.2M+</h3>
            <p className=" text-gray-700 dark:text-gray-300 text-sm">Products Sold</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">24/7</h3>
            <p className=" text-gray-700 dark:text-gray-300 text-sm">Customer Support</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/3 mt p-6 rounded-lg md:mt-0 shadow-lg bg-slate-950 dark:bg-slate-800 dark:bg-opacity-10 bg-opacity-10 ">
        <h2 className="text-lg font-semibold">Sign up today to start shopping</h2>

        {/* Google Social Login Button */}
        <Auth />
      </div>
    </div>
  );
};

export default Hero;
