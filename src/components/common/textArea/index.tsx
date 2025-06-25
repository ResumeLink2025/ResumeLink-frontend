'use client';
import React, { useEffect, useState } from 'react';

import { cn } from '@/utils/styleMerge';

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
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <textarea
      value={internalValue}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      className={cn(
        'w-full px-3 py-2 box-border rounded-md bg-white resize-none focus:outline-none focus:ring-1 focus:ring-gray-200',
        sizeMap[size],
        'border',
        'border-[color:var(--color-gray-40)]',
        'placeholder-[color:var(--color-gray-40)]',
        disabled ? 'text-[color:var(--color-gray-40)] bg-gray-10 cursor-not-allowed' : 'text-black',
      )}
    />
  );
};

export default TextArea;
