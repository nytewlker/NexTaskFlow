import React from "react";

const About = ({ darkMode }) => {
  return (
    <div
      id="about"
      className={`flex flex-col md:flex-row items-center justify-between px-8 py-12 min-h-screen`}
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:flex lg:items-center lg:space-x-12">
        
        {/* Left Section: Mission Statement */}
        <div className="lg:w-1/2 space-y-6 mb-8 lg:mb-0">
          <h2 className="text-4xl font-bold">
            We offer <span className="text-blue-400">the best deals and products</span> for your everyday needs.
          </h2>
          <p className="text-lg">
            At ShopFlow, we are committed to providing top-quality products with unmatched customer service, helping you make informed decisions and get the most out of your shopping experience.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <a href="#contact" className="text-blue-500 hover:text-blue-800 ">Contact Us</a>
          </div>
        </div>

        {/* Right Section: Key Metrics */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-semibold">1M+</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">Over 1 million happy customers worldwide.</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">500+</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">More than 500 product categories.</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">24/7</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">Customer support available 24/7 for all your needs.</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">100%</h3>
            <p className="text-sm text-gray-800 dark:text-gray-400">Satisfaction guaranteed on every purchase.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
