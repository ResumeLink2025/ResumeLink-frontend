import { cva } from 'class-variance-authority';

import { cn } from '@/utils/styleMerge';

type DropDownMenuProps = {
  isOpen?: boolean;
  size?: 'small' | 'medium' | 'large';
  direction?: 'left' | 'right';
  children: React.ReactNode;
};

const DropDownMenu = ({
  isOpen = false,
  size = 'medium',
  direction = 'right',
  children,
}: DropDownMenuProps) => {
  const dropDownMenuVariants = cva(
    'absolute border-1 border-gray-40 rounded-[10px] w-max z-10 bg-white shadow-button',
    {
      variants: {
        size: {
          small: 'px-4 py-3 mt-2',
          medium: 'px-5 py-4 mt-2',
          large: 'px-5 py-4 mt-[10px]',
        },
        direction: {
          right: 'left-0',
          left: 'right-0',
        },
      },
      defaultVariants: {
        size: 'medium',
      },
    },
  );

  return <>{isOpen && <div className={cn(dropDownMenuVariants({ size, direction }))}>{children}</div>}</>;
};

export default DropDownMenu;
