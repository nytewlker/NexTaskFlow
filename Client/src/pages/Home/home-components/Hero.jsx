import "animate.css";
import Auth from "../../Auth/Auth"

const TaskManagerHero = ({ handleLogin }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 max-w-7xl py-12 min-h-screen mx-auto">
      {/* Left Section */}
      <div className="md:w-2/3 space-y-6  text-center md:text-left animate__animated animate__fadeInLeft">
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Welcome to <span className="text-blue-400">NexTaskFlow</span>
          <br />
          Manage Your Tasks Effortlessly
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Organize, track, and manage your tasks with ease. Stay productive and
          never miss a deadline again!
        </p>
        <button
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 animate__animated animate__pulse animate__infinite"
          aria-label="Explore our Task Manager features"
        >
          <span>📋 Explore how we simplify task management</span>
        </button>

        {/* Metrics */}
        <div className="flex space-x-8 pt-6 justify-center md:justify-start">
          {[
            { value: "10k+", label: "Tasks Managed" },
            { value: "5k+", label: "Projects Completed" },
            { value: "99%", label: "User Satisfaction" },
          ].map((metric, index) => (
            <div
              key={index}
              className={`text-center animate__animated animate__fadeInUp animate__delay-${index}s`}
            >
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/3 p-6 rounded-lg mt-8 md:mt-0 shadow-lg bg-black/10 dark:bg-white/10 animate__animated animate__fadeInUp">
        <h2 className="text-lg font-semibold mb-4">
          Sign up today to start managing your tasks
        </h2>

        {/* Google Social Login Button */}
        <Auth handleLogin={handleLogin} />
        

      </div>
    </div>
  );
};

export default TaskManagerHero;
