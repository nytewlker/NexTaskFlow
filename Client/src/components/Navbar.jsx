import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode, user, handleLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserDropdownOpen(false); // Close user dropdown if mobile menu opens
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsMobileMenuOpen(false); // Close mobile menu if user dropdown opens
  };

  const handleLinkClick = () => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "p-1" : "p-4"}`}
    >
      <div className="flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={handleLinkClick}
          className="text-xl font-bold flex items-center space-x-2"
        >
          <img src={darkMode ? "logo.png" : "favicon.png"} alt="Logo" className="h-8 md:h-10" />
          <span className="hidden sm:inline">Addie's World</span>
        </a>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg"
          aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* User profile icon with dropdown (desktop) */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <button onClick={toggleUserDropdown} className="p-2 focus:outline-none">
              <FaUserCircle size={24} />
            </button>
            {isUserDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 bg-opacity-50 ${darkMode ? "bg-slate-600 text-white" : "bg-slate-300 text-black"}`}
              >
                {user && (
                  <p className="px-4 py-2 font-bold">Welcome, {user.name}</p>
                )}
                <hr className="my-2" />
                <a href="#dashboard" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-400">
                  Dashboard
                </a>
                <a href="#profile" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-400">
                  Profile
                </a>
                <a href="#contact" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-400">
                  Contact Us
                </a>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-400 text-left w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <a href="#auth" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-400">
                    Login
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden p-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        >
          <a href="#dashboard" onClick={handleLinkClick} className="block py-2">
            Dashboard
          </a>
          <a href="#profile" onClick={handleLinkClick} className="block py-2">
            Profile
          </a>
          <a href="#contact" onClick={handleLinkClick} className="block py-2">
            Contact Us
          </a>
          {user ? (
            <button
              onClick={handleLogout}
              className="block py-2 text-left w-full"
            >
              Logout
            </button>
          ) : (
            <a href="#auth" onClick={handleLinkClick} className="block py-2">
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
