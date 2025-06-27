import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import type { Ref, SelectHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';

import { cn } from '@/utils/styleMerge';

import Typography from '../Typography';

type SelectOption = { label: string; value: string };

type SelectBoxProps = {
  size?: 'small' | 'medium' | 'large';
  label?: string;
  errorMessage?: string;
  options: SelectOption[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

const selectVariants = cva(
  'w-full appearance-none border-transparent rounded-[10px] bg-white text-gray-70 focus:outline-none',
  {
    variants: {
      size: {
        small: 'h-[40px] text-[15px]',
        medium: 'h-[45px] text-[16px]',
        large: 'h-[50px] text-[18px]',
      },
      disabled: {
        true: 'cursor-default bg-gray-10 text-gray-40',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const selectIconVariants = cva('', {
  variants: {
    size: {
      small: 'size-4',
      medium: 'size-5',
      large: 'size-6',
    },
    disabled: {
      true: 'text-gray-40',
      false: 'text-gray-20',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const SelectBox = forwardRef(
  (
    { size = 'medium', errorMessage, options, disabled, defaultValue, ...props }: SelectBoxProps,
    ref: Ref<HTMLSelectElement>,
  ) => {
    const selectId = useId();

    return (
      <div className="w-full relative inline-flex flex-col gap-1">
        <div
          className={cn(
            'relative flex items-center bg-white rounded-[10px] transition duration-100 ease-in-out border px-1',
            errorMessage
              ? 'border-red-600 focus-within:border-red-600'
              : 'border-gray-40 focus-within:border-gray-60',
            disabled && 'border-gray-40 bg-gray-10 text-gray-40 cursor-default',
          )}
        >
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            defaultValue={defaultValue}
            className={cn(selectVariants({ size, disabled }), 'px-[10px]')}
            {...props}
          >
            {options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <ChevronDown className={cn(selectIconVariants({ size, disabled }), 'absolute right-2')} />
        </div>

        {errorMessage && <Typography className="text-red-500">{errorMessage}</Typography>}
      </div>
    );
  },
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
