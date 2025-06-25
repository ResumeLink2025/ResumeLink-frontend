import Container from '@/layouts/Container';
import Wrapper from '@/layouts/Wrapper';

const Footer = () => {
  return (
    <Wrapper className="bg-gray-20 h-15">
      <Container className="flex items-center justify-center">
        <span className="text-gray-40">ⓒ 2025. ResumeLink All rights reserved.</span>
      </Container>
    </Wrapper>
  );
};

export default Footer;
