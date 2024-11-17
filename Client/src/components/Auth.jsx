import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utility function for API requests
const apiRequest = async (endpoint, method, body) => {
  const baseURL = "http://localhost:5000/api";
  const url = `${baseURL}/${endpoint}`;
  
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!response.ok) {
    throw new Error(await response.text());
  }
  
  return response.json();
};

// Reusable Input Field Component
const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
    />
  </div>
);

const Auth = () => {
  const navigate = useNavigate();
  
  // Form Data State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "employee",
    verificationCode: "",
    newPassword: "",
  });
  
  // UI State
  const [uiState, setUiState] = useState({
    isLogin: true,
    isForgotPassword: false,
    isCodeSent: false,
    loading: false,
    error: null,
    success: false,
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Authentication (Login/Signup)
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setUiState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const endpoint = uiState.isLogin ? "auth/login" : "auth/signup";
      const body = uiState.isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          };

      const data = await apiRequest(endpoint, "POST", body);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: formData.email,
            name: data.name || formData.name,
            role: data.role,
            id: data.id,
          })
        );

        setUiState((prev) => ({ ...prev, success: true }));
        navigate(data.role === "admin" ? "/dsb" : "/Dashboard");
      }
    } catch (error) {
      setUiState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setUiState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setUiState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const endpoint = uiState.isCodeSent
        ? "auth/reset-password"
        : "auth/forgot-password";
      const body = uiState.isCodeSent
        ? {
            email: formData.email,
            code: formData.verificationCode,
            newPassword: formData.newPassword,
          }
        : { email: formData.email };

      await apiRequest(endpoint, "POST", body);

      if (uiState.isCodeSent) {
        setUiState((prev) => ({
          ...prev,
          isForgotPassword: false,
          isCodeSent: false,
          success: true,
        }));
        navigate("/login");
      } else {
        setUiState((prev) => ({ ...prev, isCodeSent: true }));
      }
    } catch (error) {
      setUiState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setUiState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Render Login/Signup Form
  const renderAuthForm = () => (
    <form className="space-y-4" onSubmit={handleAuthSubmit}>
      {!uiState.isLogin && (
        <>
          <InputField
            label="Your Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
          />

          <div>
            <label className="block text-sm">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </>
      )}

      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="email@example.com"
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="••••••••"
      />

      <button
        type="submit"
        disabled={uiState.loading}
        className={`w-full py-2 mt-4 rounded-md font-semibold ${
          uiState.loading
            ? "bg-gray-500"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {uiState.loading
          ? "Processing..."
          : uiState.isLogin
          ? "Log In"
          : "Create Account"}
      </button>

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={() =>
            setUiState((prev) => ({ ...prev, isLogin: !prev.isLogin }))
          }
          className="text-blue-500 hover:text-blue-600"
        >
          {uiState.isLogin ? "Create account" : "Back to login"}
        </button>

        {uiState.isLogin && (
          <button
            type="button"
            onClick={() =>
              setUiState((prev) => ({ ...prev, isForgotPassword: true }))
            }
            className="text-blue-500 hover:text-blue-600"
          >
            Forgot Password?
          </button>
        )}
      </div>
    </form>
  );

  // Render Forgot Password Form
  const renderForgotPasswordForm = () => (
    <form className="space-y-4" onSubmit={handleForgotPassword}>
      <h3 className="text-xl font-bold text-center mb-4">Reset Password</h3>

      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />

      {uiState.isCodeSent && (
        <>
          <InputField
            label="Verification Code"
            type="text"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleInputChange}
            placeholder="Enter verification code"
          />

          <InputField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter new password"
          />
        </>
      )}

      <button
        type="submit"
        disabled={uiState.loading}
        className={`w-full py-2 mt-4 rounded-md font-semibold ${
          uiState.loading
            ? "bg-gray-500"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {uiState.loading
          ? "Processing..."
          : uiState.isCodeSent
          ? "Reset Password"
          : "Send Verification Code"}
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
        className="w-full text-center text-sm text-blue-500 hover:text-blue-600"
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
          Successfully {uiState.isLogin ? "logged in" : "signed up"}!
        </p>
      )}

      {uiState.isForgotPassword
        ? renderForgotPasswordForm()
        : renderAuthForm()}
    </div>
  );
};

export default Auth;
