import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode, user, handleLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
    setIsMobileMenuOpen(false); // Close mobile menu when opening the dropdown
  };

  const handleLinkClick = (path) => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "p-2 shadow-md " : "p-4"
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-4">
        {/* Logo */}
        <div
          onClick={() => handleLinkClick("/")}
          className="text-xl font-bold flex items-center cursor-pointer"
        >
          <img
            src={darkMode ? "/logo.png" : "/favicon.png"}
            alt="Logo"
            className="h-5"
          />
          <span className="ml-2 hidden sm:inline">NexTaskFlow</span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full"
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button onClick={toggleUserDropdown} className="p-2">
            <FaUserCircle size={24} />
          </button>
          {isUserDropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 bg-opacity-80 ${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              } rounded-lg shadow-lg`}
            >
              {user && (
                <p className="px-4 py-2 font-bold">Welcome, {user.name}</p>
              )}
              <hr className="my-1" />
              <a
                onClick={() => handleLinkClick("/dashboard")}
                className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
              >
                Dashboard
              </a>
              <a
                onClick={() => handleLinkClick("/profile")}
                className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
              >
                Profile
              </a>
              {user ? (
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-300"
                >
                  Logout
                </button>
              ) : (
                <a
                  onClick={() => handleLinkClick("/login")}
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                >
                  Login
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
