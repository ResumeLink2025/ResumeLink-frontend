'use client';
import { useState } from 'react';

interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  isSearch?: boolean; // 검색 input 여부
  onSearchClick?: () => void; // 검색 아이콘 클릭 핸들러
}

export default function Input({
  value = '',
  placeholder,
  onChange,
  type = 'text',
  disabled = false,
  isValid = true,
  errorMessage,
  isSearch = false,
  onSearchClick,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const baseClass = 'w-full py-1 px-[10px] box-border rounded-md border bg-white focus:outline-none';
  const stateClass = disabled
    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
    : isValid
    ? 'text-black border-gray-400 focus:ring-1 focus:ring-gray-200'
    : 'text-red-600 border-red-500 focus:ring-1 focus:ring-red-300';

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={`${baseClass} ${stateClass} ${isSearch ? 'pr-10' : ''}`} // 오른쪽 padding 추가
      />
      {isSearch && (
        <button
          type="button"
          onClick={onSearchClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
    </div>
  );
}
