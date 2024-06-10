'use client';

import { useState } from 'react';

interface RangeSelectProps {
  onRadiusChange: (value: number) => void;
}

const RangeSelect = ({ onRadiusChange }: RangeSelectProps) => {
  const [radius, setRadius] = useState(5000);
  return (
    <div className="w-4/5 text-center">
      <h2 className="font-semibold text-xl">Select Radius (Meters)</h2>
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min="0"
        max="5000"
        step="500"
        onChange={(e: any) => {
          setRadius(e.target.value);
          onRadiusChange(e.target.value);
        }}
        defaultValue={radius}
      />
      <label className="text-gray-500">{radius} Meters</label>
    </div>
  );
};

export default RangeSelect;
