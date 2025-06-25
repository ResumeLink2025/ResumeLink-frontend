import { cn } from '@/utils/styleMerge';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Wrapper = ({ children, ...props }: WrapperProps) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(`w-full flex justify-center`, className)} {...restProps}>
      {children}
    </div>
  );
};

export default Wrapper;
