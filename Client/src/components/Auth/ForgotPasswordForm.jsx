import React from "react";
import InputField from "./InputField";

const ForgotPasswordForm = ({
  formData,
  handleInputChange,
  handleForgotPassword,
  isCodeSent,
  loading,
}) => (
  <form className="space-y-4" onSubmit={handleForgotPassword}>
    <InputField
      label="Email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="email@example.com"
    />
    {isCodeSent && (
      <>
        <InputField
          label="Verification Code"
          type="text"
          name="verificationCode"
          value={formData.verificationCode}
          onChange={handleInputChange}
          placeholder="Enter code"
        />
        <InputField
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          placeholder="New password"
        />
      </>
    )}
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-2 mt-4 rounded-md font-semibold ${
        loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {loading ? "Processing..." : isCodeSent ? "Reset Password" : "Send Code"}
    </button>
  </form>
);

export default ForgotPasswordForm;
