import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


import Layout from "./components/layout/layout";
import Home from "./pages/Home/Home";


import DashboardLayout from "./pages/dashboard/dasb-componnets/DashboardLayout";
import TaskManager from "./pages/dashboard/dasb-componnets/task";
import Dashboard from "./pages/dashboard/Dashboard";

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
        <Routes>
          <Route path="/" element={<Layout 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            user={user} 
            handleLogout={handleLogout} 
          />}> 
            <Route index element={<Home handleLogin={handleLogin} />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              user ? <DashboardLayout /> : <Navigate to="/" replace />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<TaskManager />} />
            
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
