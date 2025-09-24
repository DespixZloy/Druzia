import React from 'react';

interface QuestionCardProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function QuestionCard({ children, isActive }: QuestionCardProps) {
  return (
    <div className={`
      transition-all duration-500 ease-in-out transform
      ${isActive 
        ? 'opacity-100 translate-x-0 scale-100' 
        : 'opacity-0 translate-x-8 scale-95 pointer-events-none absolute'
      }
    `}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
        {children}
      </div>
    </div>
  );
}