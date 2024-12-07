import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

// Utility function for API requests
const apiRequest = async (endpoint, method, body) => {
  const baseURL = "https://nextaskflow.onrender.com/api";
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

const Auth = () => {
  const navigate = useNavigate();

  // UI State
  const [uiState, setUiState] = useState({
    isLogin: true,
    isForgotPassword: false,
    success: false,
    loading: false,
    error: null,
  });

  // Handle Login/Signup Submission
  const handleAuthSubmit = async (formData) => {
    setUiState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const endpoint = uiState.isLogin ? "users/login" : "users/register";
      const data = await apiRequest(endpoint, "POST", formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: data.email,
            name: data.name,
            role: data.role,
            id: data.id,
          })
        );

        setUiState((prev) => ({ ...prev, success: true }));
        navigate(data.role === "admin" ? "/dashboard" : "/userPanel");
      }
    } catch (error) {
      setUiState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setUiState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle Forgot Password Submission
  const handleForgotPasswordSubmit = async (formData, isCodeSent) => {
    setUiState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const endpoint = isCodeSent
        ? "users/reset-password"
        : "users/request-password-reset";
      await apiRequest(endpoint, "POST", formData);

      if (isCodeSent) {
        setUiState((prev) => ({
          ...prev,
          isForgotPassword: false,
          success: true,
        }));
      }
    } catch (error) {
      setUiState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setUiState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div id="auth" className="max-w-md mx-auto p-4 border rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {uiState.isLogin ? "Login" : uiState.isForgotPassword ? "Reset Password" : "Create Account"}
      </h2>

      {uiState.error && (
        <p className="text-red-500 text-center mb-4">{uiState.error}</p>
      )}

      {uiState.success && (
        <p className="text-green-500 text-center mb-4">
          {uiState.isForgotPassword
            ? "Password reset successful!"
            : uiState.isLogin
            ? "Logged in successfully!"
            : "Account created successfully!"}
        </p>
      )}

      {!uiState.isForgotPassword && uiState.isLogin && (
        <LoginForm onSubmit={handleAuthSubmit} loading={uiState.loading} />
      )}

      {!uiState.isForgotPassword && !uiState.isLogin && (
        <SignupForm onSubmit={handleAuthSubmit} loading={uiState.loading} />
      )}

      {uiState.isForgotPassword && (
        <ForgotPasswordForm
          onSubmit={handleForgotPasswordSubmit}
          loading={uiState.loading}
        />
      )}

      <div className="mt-4 text-center">
        {!uiState.isForgotPassword && (
          <button
            onClick={() =>
              setUiState((prev) => ({
                ...prev,
                isLogin: !prev.isLogin,
                error: null,
                success: false,
              }))
            }
            className="text-blue-500 hover:text-blue-700"
          >
            {uiState.isLogin ? "Create new account" : "Back to login"}
          </button>
        )}
        <button
          onClick={() =>
            setUiState((prev) => ({
              ...prev,
              isForgotPassword: !prev.isForgotPassword,
              error: null,
              success: false,
            }))
          }
          className="text-blue-500 hover:text-blue-700 ml-4"
        >
          {uiState.isForgotPassword ? "Back to login" : "Forgot Password?"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
