import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder, disabled = false, isRequired = false }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name, { required: isRequired })} // Use isRequired prop for validation
        className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
        disabled={disabled} // Set disabled attribute based on prop
      />
    </div>
  );
};

export default InputField;
