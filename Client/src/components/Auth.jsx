import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null); // State to store any error message
  const [success, setSuccess] = useState(false); // State to manage successful login/signup
  const [role, setRole] = useState('user'); // Default role is user

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
      const body = isLogin ? { email, password } : { name, email, password, role };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
        return;
      }

      const data = await response.json();

      // Store token if available
      if (data.token) {
        localStorage.setItem('token', data.token);
        setSuccess(true); // Set success state to true
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div id="auth" className="max-w-md mx-auto p-8 border- rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Login" : "Create Account"}
      </h2>
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-center mb-4">Successfully logged in! Redirecting...</p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          
          <div>
            <label className="block text-sm">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
        )}

        {!isLogin && (
          <div>
            <label className="block text-sm">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm">Your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>

        <div>
          <label className="block text-sm">Your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        {isLogin && (
          <div className="flex items-center justify-between">
            <div>
              <input type="checkbox" id="remember" className="text-blue-500" />
              <label htmlFor="remember" className="ml-2 text-sm ">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-500">
              Lost Password?
            </a>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
        >
          {isLogin ? "Log In" : "Create Account"}
        </button>

        <p className="text-center text-sm  mt-4">
          {isLogin ? "Not registered? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-500"
          >
            {isLogin ? "Create account" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
