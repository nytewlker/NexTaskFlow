import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { apiRequest } from "../../utils/api";

const Auth = ({ handleLogin }) => {
  const navigate = useNavigate();

  const [uiState, setUiState] = useState({
    isLogin: true,
    isForgotPassword: false,
    success: false,
    loading: false,
    error: null,
  });

  const [isCodeSent, setIsCodeSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    verificationCode: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setUiState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const endpoint = uiState.isLogin ? "users/login" : "users/signup";
      const data = await apiRequest(endpoint, "POST", formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        setUiState((prev) => ({ ...prev, success: true }));
        handleLogin(data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      setUiState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setUiState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setUiState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const endpoint = isCodeSent ? "users/reset-password" : "users/forgot-password";
      await apiRequest(endpoint, "POST", formData);

      if (isCodeSent) {
        setUiState((prev) => ({ ...prev, success: true }));
      } else {
        setIsCodeSent(true);
      }
    } catch (error) {
      setUiState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setUiState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="auth-container border p-4 rounded">
      <h2 className="text-center text-xl bold">{uiState.isLogin ? "Login" : uiState.isForgotPassword ? "Reset Password" : "Signup"}</h2>
      {uiState.error && <p className="error">{uiState.error}</p>}
      {uiState.success && <p className="success">Action successful!</p>}
      {uiState.isLogin ? (
        <LoginForm formData={formData} handleInputChange={handleInputChange} handleAuthSubmit={handleAuthSubmit} loading={uiState.loading} />
      ) : uiState.isForgotPassword ? (
        <ForgotPasswordForm formData={formData} handleInputChange={handleInputChange} handleForgotPassword={handleForgotPasswordSubmit} isCodeSent={isCodeSent} loading={uiState.loading} />
      ) : (
        <SignupForm formData={formData} handleInputChange={handleInputChange} handleAuthSubmit={handleAuthSubmit} loading={uiState.loading} />
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
      </div></div>
  );
};

export default Auth;
