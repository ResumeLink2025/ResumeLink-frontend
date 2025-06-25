import { cn } from '@/utils/styleMerge';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, ...props }: ContainerProps) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(`w-full max-w-[var(--w-desktop)]`, className)} {...restProps}>
      {children}
    </div>
  );
};

export default Container;
