import { cva } from 'class-variance-authority';

import Typography from '../Typography';
import { getFontType } from '../Typography/utils';

export type TagProps = {
  size?: 'small' | 'medium' | 'large';
  styleType?: 'primary' | 'gray' | 'outline' | 'outlinePrimary';
  isSelected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const tagVariants = cva('inline-flex items-center min-w-[40px] rounded-full text-gray-60 cursor-pointer', {
  variants: {
    size: {
      small: 'h-6 px-2',
      medium: 'h-8 px-3',
      large: 'h-10 px-4',
    },
    styleType: {
      primary: 'bg-primary',
      gray: 'bg-gray-25',
      outline: 'border border-gray-40',
      outlinePrimary: 'border border-primaryHover',
    },
    isSelected: {
      true: 'bg-primary border-primaryHover',
    },
  },
  defaultVariants: {
    size: 'medium',
    styleType: 'primary',
  },
});

const Tag = ({ size, styleType, isSelected, onClick, children }: TagProps) => {
  const fontType = getFontType('tag', size);

  return (
    <div className={tagVariants({ size, styleType, isSelected })} onClick={onClick}>
      <Typography type={fontType}>{children}</Typography>
    </div>
  );
};

export default Tag;
