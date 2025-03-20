import React from 'react';

const Button = ({ text, onClick, variant = 'primary', size = 'medium' }) => {
  // Basic styles
  const baseStyle = {
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  };
  
  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: '#4F46E5',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'white',
      color: '#4F46E5',
      border: '1px solid #4F46E5',
    },
    success: {
      backgroundColor: '#10B981',
      color: 'white',
    },
    danger: {
      backgroundColor: '#EF4444',
      color: 'white',
    },
  };
  
  // Size styles
  const sizeStyles = {
    small: {
      padding: '6px 12px',
      fontSize: '0.875rem',
    },
    medium: {
      padding: '8px 16px',
      fontSize: '1rem',
    },
    large: {
      padding: '10px 20px',
      fontSize: '1.125rem',
    },
  };
  
  const buttonStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };
  
  return (
    <button 
      style={buttonStyle} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;