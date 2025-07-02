import type { Ref } from 'react';
import { forwardRef, type TextareaHTMLAttributes, useId } from 'react';

import { cn } from '@/utils/styleMerge';

import Typography from '../Typography';

type TextareaProps = {
  label?: string;
  errorMessage?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef(
  ({ errorMessage, label, disabled, ...props }: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
    const { className, ...restProps } = props;

    const textareaId = useId();

    return (
      <div className={cn('w-full relative inline-flex flex-col gap-1', className)}>
        {label && (
          <label htmlFor={textareaId} className="color w-fit text-gray-70">
            <Typography type="body2">{label}</Typography>
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'rounded-[10px] bg-white transition duration-100 text-gray-70 border focus:outline-none min-h-45 resize-none px-[14px] py-[10px] hide-scrollbar',
            !!errorMessage ? 'border-red-600' : 'border-gray-40 focus:border-gray-60',
            disabled && 'border-gray-40 text-gray-40 bg-gray-10 cursor-default pointer-events-none',
          )}
          id={textareaId}
          {...restProps}
        />
        {errorMessage && <Typography className="text-red-500">{errorMessage}</Typography>}
      </div>
    );
  },
);

Textarea.displayName = 'textarea';

export default Textarea;
