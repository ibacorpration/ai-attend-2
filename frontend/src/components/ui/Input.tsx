import React from 'react';
import { Input as HeroInput, InputProps as HeroInputProps } from '@heroui/react';

// Using Omit to avoid clashes with standard HTML input attributes if they were passed
interface InputProps extends Omit<HeroInputProps, 'size'> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <HeroInput 
      label={label}
      labelPlacement="outside"
      startContent={icon}
      className={className}
      {...props as any}
    />
  );
};
