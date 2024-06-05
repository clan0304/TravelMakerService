'use client';

import { useState } from 'react';

interface RangeSelectProps {
  onRadiusChange: (value: number) => void;
}

const RangeSelect = ({ onRadiusChange }: RangeSelectProps) => {
  const [radius, setRadius] = useState(1000);
  return (
    <div>
      <h2>Select Radius (In Meter)</h2>
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min="0"
        max="10000"
        step="1000"
        onChange={(e: any) => {
          setRadius(e.target.value);
          onRadiusChange(e.target.value);
        }}
        defaultValue={radius}
      />
      <label className="text-gray-500">{radius} in Meter</label>
    </div>
  );
};

export default RangeSelect;
