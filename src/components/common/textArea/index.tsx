'use client';
import React from 'react';

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const sizeMap = {
  small: 'h-[180px]',
  medium: 'h-[200px]',
  large: 'h-[220px]',
};

const TextArea: React.FC<TextAreaProps> = ({
  value = '',
  placeholder = '',
  onChange,
  size = 'medium',
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      className={`w-full px-3 py-2 box-border rounded-md border border-gray-400 bg-white text-black focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none ${sizeMap[size]}`}
    />
  );
};

export default TextArea;
