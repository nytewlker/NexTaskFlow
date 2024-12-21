import React from "react";
import InputField from "../../components/common/Input";
import Button from "../../components/common/Button";

const SignupForm = ({ formData, handleInputChange, handleAuthSubmit, loading }) => (
  <form className="space-y-4" onSubmit={handleAuthSubmit}>
    <InputField
      label="Your Name"
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      placeholder="Your name"
    />
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
      {loading ? "Processing..." : "Create Account"}
    </Button>
  </form>
);

export default SignupForm;
