'use client';
import type { InputHTMLAttributes } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type CustomInputProps = {
  isValid?: boolean;
  errorMessage?: string;
  isSearch?: boolean;
  onSearchClick?: () => void;
  inputSize?: 'sm' | 'md' | 'lg';
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

export default function Input({
  isValid = true,
  errorMessage,
  isSearch = false,
  onSearchClick,
  inputSize,
  disabled,
  onChange,
  ...rest
}: InputProps) {
  const heightClass = inputSize === 'sm' ? 'h-[35px]' : inputSize === 'lg' ? 'h-[45px]' : 'h-[40px]';

  const baseClass = `w-full px-[10px] box-border rounded-md border bg-white focus:outline-none ${heightClass}`;
  const disabledClass =
    'bg-[var(--color-gray-10)] text-[var(--color-gray-30)] cursor-not-allowed border-[var(--color-gray-30)]';
  const validClass =
    'text-black border-[var(--color-gray-40)] focus:ring-1 focus:ring-[var(--color-gray-20)] focus:border-[var(--color-gray-70)]';
  const invalidClass = 'text-red-600 border-red-500 focus:ring-1 focus:ring-red-300';

  const stateClass = disabled ? disabledClass : isValid ? validClass : invalidClass;
  const placeholderColor = disabled ? 'var(--color-gray-30)' : 'var(--color-gray-50)';

  return (
    <div className="flex flex-col gap-1 relative box-border">
      <input
        disabled={disabled}
        onChange={onChange}
        className={`${baseClass} ${stateClass} ${isSearch ? 'pr-10' : ''} `}
        {...rest}
      />

      {isSearch && (
        <button
          type="button"
          onClick={onSearchClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-gray-50)] hover:text-[var(--color-gray-70)] focus:outline-none"
          aria-label="검색"
        >
          <AiOutlineSearch size={20} />
        </button>
      )}

      {!isValid && errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}

      <style jsx>{`
        input::placeholder {
          color: ${placeholderColor};
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
