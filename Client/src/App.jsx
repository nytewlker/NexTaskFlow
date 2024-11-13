import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(savedDarkMode || false);

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
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        
        {/* Routes */}
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
        {/* Footer */}
        <Footer darkMode={darkMode}/>
      </div>
    </Router>
  );
}

export default App;
