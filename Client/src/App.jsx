import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Projects from "./pages/dashboard/Projects";
import TaskManager from "./pages/dashboard/task";
import Dashboard from "./pages/dashboard/dsb";

function App() {
  // Dark mode aur user state
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(savedDarkMode || false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null); // Reset user state
  };

  const handleLogin = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData)); // Store user data
    setUser(userData); // Update user state
  };

  // Dark mode apply
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`antialiased h-full`}>
        {/* Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          handleLogout={handleLogout}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} /> {/* Default route */}
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<TaskManager />} />
          </Route>
        </Routes>

        {/* Footer */}
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
