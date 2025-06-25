import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils/styleMerge';

const typographyVariants = cva('whitespace-pre-line text-wrap', {
  variants: {
    type: {
      heading1: 'font-bold text-[24px] leading-[145%]',
      heading2: 'font-bold text-[22px] leading-[145%]',
      heading3: 'font-bold text-[20px] leading-[145%]',
      heading4: 'font-bold text-[18px] leading-[155%]',
      title1: 'font-semibold text-[20px] leading-[155%]',
      title2: 'font-semibold text-[18px] leading-[155%]',
      title3: 'font-semibold text-[16px] leading-[155%]',
      title4: 'font-semibold text-[15px] leading-[155%]',
      title5: 'font-semibold text-[14px] leading-[155%]',
      body1: 'font-medium text-[17px] leading-[155%]',
      body2: 'font-medium text-[16px] leading-[155%]',
      body3: 'font-medium text-[15px] leading-[155%]',
      body4: 'font-medium text-[14px] leading-[155%]',
    },
  },
  defaultVariants: {
    type: 'body3',
  },
});

export type fontType = VariantProps<typeof typographyVariants>['type'];

type TypographyProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof typographyVariants>;

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(({ children, type, ...props }, ref) => {
  const { className, ...restProps } = props;

  return (
    <span ref={ref} className={cn(typographyVariants({ type }), className)} {...restProps}>
      {children}
    </span>
  );
});

Typography.displayName = 'Typography';

export default Typography;
