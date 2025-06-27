'use client';
import React from 'react';

import { cn } from '@/utils/styleMerge';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 'h-[180px]',
  medium: 'h-[200px]',
  large: 'h-[220px]',
};

const TextArea = ({ size = 'medium', disabled = false, className, ...props }: TextAreaProps) => {
  return (
    <textarea
      disabled={disabled}
      {...props}
      className={cn(
        'w-full px-3 py-2 box-border rounded-md bg-white resize-none focus:outline-none focus:ring-1 focus:ring-gray-200',
        'border-gray-40',
        'placeholder-gray-40 text-[16px]',
        disabled ? 'text-gray-40 bg-gray-10 cursor-not-allowed' : 'text-black',
        sizeMap[size],
        className,
      )}
    />
  );
};

export default TextArea;
