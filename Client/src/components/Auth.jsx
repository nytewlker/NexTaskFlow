import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    verificationCode: "",
    newPassword: "",
  });

  const [uiState, setUiState] = useState({
    isLogin: true,
    isForgotPassword: false,
    isCodeSent: false,
    error: null,
    success: false,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setUiState((prev) => ({ ...prev, error: null }));

    try {
      const url = uiState.isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

      const body = uiState.isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();

      if (data.token) {
        // Save both token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify({
          email: formData.email,
          name: data.name || formData.name,
          role: data.role,
          id: data.id
        }));
        
        setUiState((prev) => ({ ...prev, success: true }));
        navigate(data.role === 'admin' ? '/dsb' : '/Dashboard');
      }
      
    } catch (error) {
      setUiState((prev) => ({
        ...prev,
        error: error.message || "An unexpected error occurred. Please try again.",
      }));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setUiState((prev) => ({ ...prev, error: null }));

    try {
      const url = !uiState.isCodeSent
        ? "http://localhost:5000/api/auth/forgot-password"
        : "http://localhost:5000/api/auth/reset-password";

      const body = !uiState.isCodeSent
        ? { email: formData.email }
        : {
            email: formData.email,
            code: formData.verificationCode,
            newPassword: formData.newPassword,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      if (!uiState.isCodeSent) {
        setUiState((prev) => ({ ...prev, isCodeSent: true }));
      } else {
        setUiState((prev) => ({
          ...prev,
          isForgotPassword: false,
          isCodeSent: false,
          success: true,
        }));
        navigate("/login");
      }
    } catch (error) {
      setUiState((prev) => ({
        ...prev,
        error:
          error.message || "An unexpected error occurred. Please try again.",
      }));
    }
  };

  const renderAuthForm = () => (
    <form className="space-y-4" onSubmit={handleAuthSubmit}>
      {!uiState.isLogin && (
        <>
          <div>
            <label className="block text-sm">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="bg-transparent" value="user">User</option>
              <option className="bg-transparent"value="admin">Admin</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
      >
        {uiState.isLogin ? "Log In" : "Create Account"}
      </button>

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={() =>
            setUiState((prev) => ({ ...prev, isLogin: !prev.isLogin }))
          }
          className="text-blue-400 hover:text-blue-500"
        >
          {uiState.isLogin ? "Create account" : "Back to login"}
        </button>

        {uiState.isLogin && (
          <button
            type="button"
            onClick={() =>
              setUiState((prev) => ({ ...prev, isForgotPassword: true }))
            }
            className="text-blue-400 hover:text-blue-500"
          >
            Forgot Password?
          </button>
        )}
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form className="space-y-4" onSubmit={handleForgotPassword}>
      <h3 className="text-xl font-bold text-center mb-4">Reset Password</h3>

      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      {uiState.isCodeSent && (
        <>
          <div>
            <label className="block text-sm">Verification Code</label>
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter verification code"
            />
          </div>

          <div>
            <label className="block text-sm">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
      >
        {!uiState.isCodeSent ? "Send Verification Code" : "Reset Password"}
      </button>

      <button
        type="button"
        onClick={() =>
          setUiState((prev) => ({
            ...prev,
            isForgotPassword: false,
            isCodeSent: false,
            error: null,
          }))
        }
        className="w-full text-center text-sm text-blue-400 hover:text-blue-500"
      >
        Back to Login
      </button>
    </form>
  );

  return (
    <div id="auth" className="max-w-md mx-auto p-4 border rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {uiState.isLogin ? "Login" : "Create Account"}
      </h2>

      {uiState.error && (
        <p className="text-red-500 text-center mb-4">{uiState.error}</p>
      )}

      {uiState.success && (
        <p className="text-green-500 text-center mb-4">
          Successfully {uiState.isLogin ? "logged in" : "registered"}!
          Redirecting...
        </p>
      )}

      {uiState.isForgotPassword ? renderForgotPasswordForm() : renderAuthForm()}
    </div>
  );
};

export default Auth;
