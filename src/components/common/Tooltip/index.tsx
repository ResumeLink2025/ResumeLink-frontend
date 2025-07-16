import { cva, type VariantProps } from 'class-variance-authority';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: VariantProps<typeof tooltipContentVariants>['position'];
};

const tooltipContentVariants = cva(
  'absolute z-10 max-w-80 bg-white border p-[14px] rounded-lg border-gray-40 opacity-0 invisible duration-200 group-hover:opacity-100 group-hover:visible w-max',
  {
    variants: {
      position: {
        top: 'bottom-[125%] left-1/2 -translate-x-1/2',
        bottom: 'top-[125%] left-1/2 -translate-x-1/2',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  },
);

const tooltipArrowVariants = cva('absolute size-[11px] border-[5px] border-solid', {
  variants: {
    position: {
      top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-40 border-x-transparent border-b-transparent',
      bottom:
        'bottom-full left-1/2 -translate-x-1/2 border-b-gray-40 border-x-transparent border-t-transparent',
    },
  },
  defaultVariants: {
    position: 'top',
  },
});

const Tooltip = ({ children, content, position }: TooltipProps) => {
  return (
    <div className="group relative inline-block">
      <span className="inline-block cursor-default">{children}</span>
      <div className={tooltipContentVariants({ position })}>
        {content}
        <div className={tooltipArrowVariants({ position })} />
      </div>
    </div>
  );
};

export default Tooltip;
