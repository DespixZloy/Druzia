import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  type = 'button'
}: AnimatedButtonProps) {
  const baseClasses = `
    px-8 py-3 rounded-xl font-semibold text-white
    transition-all duration-300 ease-out transform
    hover:scale-105 hover:shadow-lg
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden
  `;

  const variantClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
    : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300" />
    </button>
  );
}