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
  /** ─ 커스텀 클래스를 select 요소에만 적용하고 싶을 때 사용 */
  selectClassName?: string;
  placeholder?: string;
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
    {
      size = 'medium',
      errorMessage,
      options,
      disabled,
      placeholder,
      selectClassName, // ⬅️ 1) DOM 으로 전달되지 않도록 먼저 추출
      ...props
    }: SelectBoxProps,
    ref: Ref<HTMLSelectElement>,
  ) => {
    const { className, ...restProps } = props; // 외부 div 용 className만 유지
    const selectId = useId();

    return (
      <div className={cn('w-full relative inline-flex flex-col gap-1', className)}>
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
            className={cn(selectVariants({ size, disabled }), 'px-[10px]', selectClassName)}
            {...restProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {/* ────────────────── Chevron Icon ────────────────── */}
          <ChevronDown className={cn(selectIconVariants({ size, disabled }), 'absolute right-2')} />
        </div>

        {/* ────────────────── Error Text ────────────────── */}
        {errorMessage && <Typography className="text-red-500">{errorMessage}</Typography>}
      </div>
    );
  },
);

SelectBox.displayName = 'SelectBox';
export default SelectBox;
