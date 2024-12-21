import React from "react";
import InputField from "../../components/common/Input";
import Button from "../../components/common/Button";

const LoginForm = ({ formData, handleInputChange, handleAuthSubmit, loading }) => (
  <form className="space-y-4" onSubmit={handleAuthSubmit}>
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
    <Button type="submit" disabled={loading}>
      {loading ? "Processing..." : "Log In"}
    </Button>
  </form>
);

export default LoginForm;
