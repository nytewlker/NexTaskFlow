import React from "react";
import InputField from "./InputField";

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
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-2 mt-4 rounded-md font-semibold ${
        loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {loading ? "Processing..." : "Log In"}
    </button>
  </form>
);

export default LoginForm;
