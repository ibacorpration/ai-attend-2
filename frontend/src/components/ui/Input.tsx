import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input className={`input-field ${className}`} {...props} />
    </div>
  );
};
