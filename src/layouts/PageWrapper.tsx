import { cn } from '@/utils/styleMerge';

import Container from './Container';
import Wrapper from './Wrapper';

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PageWrapper = ({ children, ...props }: PageWrapperProps) => {
  const { className, ...restProps } = props;

  return (
    <Wrapper className={cn(`min-h-[calc(100dvh-60px)]`, className)} {...restProps}>
      <Container className="pt-[95px]">{children}</Container>
    </Wrapper>
  );
};

export default PageWrapper;
