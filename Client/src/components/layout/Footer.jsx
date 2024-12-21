import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {  // Destructure darkMode from props
  return (
    <footer
      className={`relative p5 bottom-0 w-full p-4 text-center`}
    >
      <p>&copy; {new Date().getFullYear()} My Website. All Rights Reserved.</p>
      <div className="flex justify-center space-x-6 mt-2">
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={20} />
        </a>
        <a href="mailto:your-email@example.com">
          <FaEnvelope size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
