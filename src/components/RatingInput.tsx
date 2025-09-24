import React from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function RatingInput({ value, onChange, max = 5 }: RatingInputProps) {
  return (
    <div className="flex justify-center gap-2 my-6">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(starValue)}
            className={`
              transition-all duration-200 ease-out transform
              hover:scale-110 active:scale-95
              ${starValue <= value ? 'text-yellow-400' : 'text-gray-300'}
            `}
          >
            <Star 
              size={32} 
              fill={starValue <= value ? 'currentColor' : 'none'}
              className="drop-shadow-sm"
            />
          </button>
        );
      })}
    </div>
  );
}