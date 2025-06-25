'use client';
import { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectBoxProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function SelectBox({ options, defaultValue, onChange }: SelectBoxProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      style={{
        padding: '4px 10px',
      }}
      className="w-full rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:ring-1 focus:ring-grey-400"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-black bg-black"
          style={{ backgroundColor: 'black' }}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
