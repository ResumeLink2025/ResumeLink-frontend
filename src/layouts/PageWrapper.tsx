import { cn } from '@/utils/styleMerge';

import Container from './Container';
import Wrapper from './Wrapper';

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PageWrapper = ({ children, ...props }: PageWrapperProps) => {
  const { className, ...restProps } = props;

  return (
    <Wrapper className={cn('pt-[95px]', className)} {...restProps}>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default PageWrapper;
