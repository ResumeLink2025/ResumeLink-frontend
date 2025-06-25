'use client';
import { useState } from 'react';

interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  isValid?: boolean;
  errorMessage?: string;
}

export default function Input({
  value = '',
  placeholder,
  onChange,
  type = 'text',
  disabled = false,
  isValid = true,
  errorMessage,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const baseClass = 'w-full py-1 px-[10px] box-border rounded-md border bg-white focus:outline-none';
  const stateClass = disabled
    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
    : isValid
    ? 'text-black border-gray-400 focus:ring-1 focus:ring-gray-200'
    : 'text-red-600 border-red-500 focus:ring-1 focus:ring-red-300';

  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={`${baseClass} ${stateClass}`}
      />
      {!isValid && errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
}
