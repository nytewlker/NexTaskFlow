import React from "react";
import InputField from "../../components/common/Input";
import Button from "../../components/common/Button";

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
    <Button type="submit" disabled={loading}>
      {loading ? "Processing..." : isCodeSent ? "Reset Password" : "Send Code"}
    </Button>
  </form>
);

export default ForgotPasswordForm;
