import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  ariaLabel?: string;
}

const Input: React.FC<InputProps> = ({ label, ariaLabel, ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
    <input
      {...props}
      aria-label={ariaLabel || label}
      className={
        'w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 ' +
        (props.className || '')
      }
    />
  </div>
);

export default Input;
