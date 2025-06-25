import { cva } from 'class-variance-authority';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils/styleMerge';

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  styleType?: 'gray20' | 'gray25' | 'primary' | 'white' | 'outline';
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonVariants = cva(
  'w-full text-gray-60 font-semibold outline-none cursor-pointer transition duration-100 ease-in-out disabled:cursor-default disabled:text-gray-40',
  {
    variants: {
      size: {
        small: 'h-[40px] rounded-lg',
        medium: 'h-[45px] rounded-[10px]',
        large: 'h-[55px] rounded-[10px]',
      },
      styleType: {
        gray20: 'bg-gray-20 hover:bg-gray-30 disabled:bg-gray-20',
        gray25: 'bg-gray-25 hover:bg-gray-30 disabled:bg-gray-25',
        primary: 'bg-primary hover:bg-primaryHover disabled:bg-primary-light',
        white: 'bg-white hover:bg-gray-25 disabled:bg-gray-25',
        outline:
          'bg-white outline-solid outline-1 outline-gray-40 hover:bg-gray-20 disabled:bg-white disabled:outline-gray-30',
      },
    },
    defaultVariants: {
      size: 'medium',
      styleType: 'primary',
    },
  },
);

const Button = forwardRef(
  ({ size, styleType, children, ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { className, type, ...restProps } = props;

    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={cn(buttonVariants({ size, styleType }), className)}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
