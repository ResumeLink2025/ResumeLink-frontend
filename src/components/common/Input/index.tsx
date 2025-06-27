import { cva } from 'class-variance-authority';
import type { InputHTMLAttributes, Ref} from 'react';
import { forwardRef, useId } from 'react';

import { cn } from '@/utils/styleMerge';

import Typography from '../Typography';
import { getFontType } from '../Typography/utils';

type InputProps = {
  size?: 'small' | 'medium' | 'large';
  label?: string;
  icon?: React.ReactNode;
  errorMessage?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

const inputVariants = cva(
  'w-full border-transparent rounded-[10px] placeholder:text-gray-40 focus:outline-none',
  {
    variants: {
      size: {
        small: 'h-[40px] px-3 text-[15px]',
        medium: 'h-[45px] px-[14px] text-[17px]',
        large: 'h-[50px] px-4 text-[18px]',
      },
      disabled: {
        true: 'cursor-default',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const inputIconVariants = cva('flex items-center justify-center text-gray-40 rounded-[10px] pr-[10px]', {
  variants: {
    size: {
      small: 'h-[40px]',
      medium: 'h-[45px]',
      large: 'h-[50px]',
    },
    disabled: {
      true: 'cursor-default',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const Input = forwardRef(
  (
    { errorMessage, size = 'medium', type, label, icon, disabled, ...props }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { className, ...restProps } = props;

    const inputId = useId();
    const fontType = getFontType('input', size);

    return (
      <div className="w-full relative inline-flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="color w-fit text-gray-70">
            <Typography type={fontType}>{label}</Typography>
          </label>
        )}
        <div
          className={cn(
            'flex bg-white rounded-[10px] transition duration-100 ease-in-out border text-gray-70',
            !!errorMessage
              ? 'border-red-600 focus-within:border-red-600 focus:outline-red-600'
              : 'border-gray-40 focus-within:border-gray-60',
            disabled && 'border-gray-40 text-gray-40 bg-gray-10 cursor-default',
            className,
          )}
        >
          <input
            ref={ref}
            className={cn(inputVariants({ size, disabled }))}
            id={inputId}
            type={type || 'text'}
            disabled={disabled}
            {...restProps}
          />
          {icon && <div className={inputIconVariants({ size, disabled })}>{icon}</div>}
        </div>
        {errorMessage && (
          <Typography type={fontType} className="text-red-500">
            {errorMessage}
          </Typography>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
