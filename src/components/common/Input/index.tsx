'use client';
import type { InputHTMLAttributes } from 'react';

type CustomInputProps = {
  isValid?: boolean;
  errorMessage?: string;
  inputSize?: 'sm' | 'md' | 'lg';
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

export default function Input({
  isValid = true,
  errorMessage,
  inputSize,
  disabled,
  onChange,
  ...rest
}: InputProps) {
  const heightClass = inputSize === 'sm' ? 'h-[40px]' : inputSize === 'lg' ? 'h-[50px]' : 'h-[45px]';

  const baseClass = `w-full px-[10px] box-border rounded-md border bg-white focus:outline-none ${heightClass}`;
  const disabledClass =
    'bg-[var(--color-gray-10)] text-[var(--color-gray-30)] cursor-not-allowed border-[var(--color-gray-30)] placeholder-[var(--color-gray-30)]';
  const validClass =
    'text-black border-[var(--color-gray-40)] focus:ring-1 focus:ring-[var(--color-gray-20)] focus:border-[var(--color-gray-70)] placeholder-[var(--color-gray-50)]';
  const invalidClass = 'border-red-500 focus:ring-1 focus:ring-red-300 focus:border-red-500';

  const stateClass = disabled ? disabledClass : isValid ? validClass : invalidClass;

  return (
    <div className="flex flex-col gap-1 relative box-border">
      <input disabled={disabled} onChange={onChange} className={`${baseClass} ${stateClass}`} {...rest} />

      {!isValid && errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
}
