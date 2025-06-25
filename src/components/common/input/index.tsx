import type { InputHTMLAttributes } from 'react';

interface CustomInputProps {
  isValid?: boolean;
  errorMessage?: string;
  isSearch?: boolean;
  onSearchClick?: () => void;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

export default function Input({
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  placeholder,
  isValid = true,
  errorMessage,
  isSearch = false,
  onSearchClick,
  ...rest
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const baseClass = 'w-full py-1 px-[10px] box-border rounded-md border bg-white focus:outline-none';

  const disabledClass =
    'bg-[var(--color-gray-10)] text-[var(--color-gray-30)] cursor-not-allowed border-[var(--color-gray-30)]';
  const validClass =
    'text-black border-[var(--color-gray-40)] focus:ring-1 focus:ring-[var(--color-gray-20)] focus:border-[var(--color-gray-70)]';
  const invalidClass = 'text-red-600 border-red-500 focus:ring-1 focus:ring-red-300';

  const stateClass = disabled ? disabledClass : isValid ? validClass : invalidClass;

  const placeholderColor = disabled ? 'var(--color-gray-30)' : 'var(--color-gray-50)';

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={`${baseClass} ${stateClass} ${isSearch ? 'pr-10' : ''}`}
        {...rest}
      />
      {isSearch && (
        <button
          type="button"
          onClick={onSearchClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-gray-50)] hover:text-[var(--color-gray-70)] focus:outline-none"
          aria-label="검색"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
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
