import React from "react";
import InputField from "./InputField";

const RegisterForm = ({ formData, handleInputChange, handleAuthSubmit, loading }) => (
  <form className="space-y-4" onSubmit={handleAuthSubmit}>
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
      {loading ? "Processing..." : "Create Account"}
    </button>
  </form>
);

export default RegisterForm;
