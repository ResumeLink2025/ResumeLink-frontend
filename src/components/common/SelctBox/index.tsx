import type { SelectHTMLAttributes } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface CustomSelectProps {
  isValid?: boolean;
  errorMessage?: string;
}

type SelectOption = { label: string; value: string };

type SelectBoxProps = SelectHTMLAttributes<HTMLSelectElement> &
  CustomSelectProps & {
    options: SelectOption[];
  };

export default function SelectBox({
  options,
  isValid = true,
  errorMessage,
  className = '',
  disabled = false,
  ...rest
}: SelectBoxProps) {
  const baseClass =
    'w-full py-1 px-3 box-border rounded-md border bg-white appearance-none focus:outline-none';

  const disabledClass =
    'bg-[var(--color-gray-10)] text-[var(--color-gray-30)] cursor-not-allowed border-[var(--color-gray-30)]';
  const validClass =
    'text-black border-[var(--color-gray-40)] focus:ring-1 focus:ring-[var(--color-gray-20)] focus:border-[var(--color-gray-70)]';
  const invalidClass = 'text-red-600 border-red-500 focus:ring-1 focus:ring-red-300';

  const stateClass = disabled ? disabledClass : isValid ? validClass : invalidClass;

  return (
    <div className="flex flex-col gap-1 relative">
      <select disabled={disabled} className={`${baseClass} ${stateClass} ${className} pr-8`} {...rest}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {!isValid && errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}

      <div
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--color-gray-50)' }}
      >
        <HiChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}
