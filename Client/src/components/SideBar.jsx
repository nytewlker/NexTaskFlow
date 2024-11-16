import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = "block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded";

  return (
    <div className="w-64 shadow-lg py-8 min-h-96  bg-opacity-50 dark:bg-opacity-50 rounded-md bg-white dark:bg-gray-800 border-b lg:border-b-0 lg:border-r dark:border-gray-700 fixed">
      <h2 className="text-lg font-bold mb-4 px-4">Dashboard</h2>
      <nav className="space-y-2 px-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-gray-300 font-bold" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="projects"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-gray-300 font-bold" : ""}`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="tasks"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-gray-300 font-bold" : ""}`
          }
        >
          Tasks
        </NavLink>
        <NavLink
        to="users"
        className={({ isActive}) =>
          `${linkStyle} ${isActive ? "bg-gray-300 font-bold" : ""}`
        }
        >
          Users
          </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
