import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils/styleMerge';

const typographyVariants = cva('whitespace-pre-line text-wrap', {
  variants: {
    type: {
      heading1: 'font-bold text-[24px] leading-[135%]',
      heading2: 'font-bold text-[22px] leading-[135%]',
      heading3: 'font-bold text-[20px] leading-[135%]',
      heading4: 'font-bold text-[18px] leading-[145%]',
      title1: 'font-semibold text-[20px] leading-[145%]',
      title2: 'font-semibold text-[18px] leading-[145%]',
      title3: 'font-semibold text-[16px] leading-[145%]',
      title4: 'font-semibold text-[15px] leading-[145%]',
      title5: 'font-semibold text-[14px] leading-[145%]',
      body1: 'font-medium text-[17px] leading-[145%]',
      body2: 'font-medium text-[16px] leading-[145%]',
      body3: 'font-medium text-[15px] leading-[145%]',
      body4: 'font-medium text-[14px] leading-[145%]',
      body5: 'font-medium text-[13px] leading-[145%]',
    },
  },
  defaultVariants: {
    type: 'body3',
  },
});

export type fontType = VariantProps<typeof typographyVariants>['type'];

type TypographyProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof typographyVariants>;

const Typography = forwardRef<HTMLSpanElement, TypographyProps>(({ children, type, ...props }, ref) => {
  const { className, ...restProps } = props;

  return (
    <span ref={ref} className={cn(typographyVariants({ type }), className)} {...restProps}>
      {children}
    </span>
  );
});

Typography.displayName = 'Typography';

export default Typography;
