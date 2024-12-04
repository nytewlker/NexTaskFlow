import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Projects from "./pages/dashboard/Projects";
import TaskManager from "./pages/dashboard/task";
import Dashboard from "./pages/dashboard/dsb";

import UserList from "./pages/dashboard/userList";

function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(savedDarkMode ?? prefersDark);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.classList.toggle("light", !darkMode);
  }, [darkMode]);

  return (
    <Router>
      
      <div className="antialiased h-full">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          handleLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home handleLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              user ? <DashboardLayout /> : <Navigate to="/" replace />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<TaskManager />} />
            <Route path="users" element={<UserList />} />
          </Route>
        </Routes>

        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
