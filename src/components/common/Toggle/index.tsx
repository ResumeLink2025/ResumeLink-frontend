import { cva } from 'class-variance-authority';

import { cn } from '@/utils/styleMerge';

type ToggleProps = {
  size: 'small' | 'medium' | 'large';
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

const toggleVariants = cva('relative inline-flex rounded-full transition', {
  variants: {
    size: {
      small: 'w-10 h-6',
      medium: 'w-12 h-7',
      large: 'w-14 h-8',
    },
    checked: {
      true: 'bg-primary',
      false: 'bg-gray-30',
    },
    disabled: {
      true: 'cursor-default opacity-40',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const Toggle = ({ size = 'medium', checked, disabled = false, onChange }: ToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={toggleVariants({ checked, disabled, size })}
    >
      <span
        className={cn(
          'absolute m-[2px] h-[calc(100%-4px)] w-1/2 rounded-full bg-white transition duration-200',
          checked ? 'translate-x-5/6' : 'translate-x-0',
        )}
      />
    </button>
  );
};

export default Toggle;
