import React from 'react';

interface PixelButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'blue';
  className?: string;
}

const PixelButton: React.FC<PixelButtonProps> = ({ onClick, children, variant = 'primary', className = '' }) => {
  const colors = {
    primary: 'bg-green-500 hover:bg-green-400 text-black border-green-700',
    secondary: 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-800',
    danger: 'bg-red-500 hover:bg-red-400 text-white border-red-700',
    blue: 'bg-blue-500 hover:bg-blue-400 text-white border-blue-700'
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${colors[variant]} 
        border-b-4 border-r-4 active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1
        px-6 py-3 uppercase text-xs sm:text-sm font-bold tracking-wider
        transition-all duration-75
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PixelButton;