import Container from './Container';
import Wrapper from './Wrapper';

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PageWrapper = ({ children, ...props }: PageWrapperProps) => {
  const { className, ...restProps } = props;

  return (
    <Wrapper className="pt-[95px]" {...restProps}>
      <Container className={className}>{children}</Container>
    </Wrapper>
  );
};

export default PageWrapper;
