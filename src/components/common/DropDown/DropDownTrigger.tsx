import { cva } from 'class-variance-authority';

import { cn } from '@/utils/styleMerge';

import Typography from '../Typography';
import { getFontType } from '../Typography/utils';

type DropDownTriggerProps = {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
};

const DropDownTrigger = ({ size, onClick, children }: DropDownTriggerProps) => {
  const dropDownTriggerVariants = cva(
    'border border-gray-40 bg-white cursor-pointer hover:bg-gray-25 transition',
    {
      variants: {
        size: {
          small: 'h-[40px] rounded-[10px] px-6',
          medium: 'h-[45px] rounded-[10px] px-6',
          large: 'h-[50px] rounded-[10px] px-8',
        },
      },
      defaultVariants: {
        size: 'medium',
      },
    },
  );

  const fontType = getFontType('dropDown', size);

  return (
    <button type="button" className={cn(dropDownTriggerVariants({ size }))} onClick={onClick}>
      <Typography type={fontType} className="text-gray-50">
        {children}
      </Typography>
    </button>
  );
};

export default DropDownTrigger;
