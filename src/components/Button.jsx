import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false 
}) => {
  const baseStyles = 'transition-all ease-in-out duration-300 rounded-md font-semibold focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 disabled:bg-gray-300',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 disabled:border-gray-300 disabled:text-gray-400',
    ghost: 'bg-transparent text-blue-500 hover:bg-blue-100 active:bg-blue-200 disabled:text-gray-400',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
