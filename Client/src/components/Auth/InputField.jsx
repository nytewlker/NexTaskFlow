import React from "react";

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

export default InputField;
