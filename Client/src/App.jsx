import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/dsb";
import ProjectDashboard from "./pages/empl";
import KanbanBoard from "./pages/kenben";

function App() {
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(savedDarkMode || false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);  // Update state to reflect user logout
  };

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
      <div className={`antialiased  hiw-full`}>
        {/* Navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} user={user} handleLogout={handleLogout} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dsb" element={<EmployerDashboard />} />
          <Route path="/empl" element={<ProjectDashboard />} />
          <Route path="/kn" element={<KanbanBoard />} />
        </Routes>

        {/* Footer */}
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
