import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/styleMerge';

type TextareaSizeType = 'small' | 'medium' | 'large';

type TextareaProps = {
  size?: TextareaSizeType;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const sizeMap: Record<TextareaSizeType, string> = {
  small: 'h-[180px] text-[14px]',
  medium: 'h-[200px] text-[16px]',
  large: 'h-[220px] text-[18px]',
};

const Textarea = ({ size = 'medium', disabled = false, className, ...props }: TextareaProps) => {
  return (
    <textarea
      disabled={disabled}
      {...props}
      className={cn(
        'w-full px-3 py-2 box-border rounded-md bg-white resize-none focus:outline-none focus:ring-1 focus:ring-gray-200',
        'border-gray-40',
        'placeholder-gray-40',
        disabled ? 'text-gray-40 bg-gray-10 cursor-not-allowed' : 'text-black',
        sizeMap[size],
        className,
      )}
    />
  );
};

export default Textarea;
