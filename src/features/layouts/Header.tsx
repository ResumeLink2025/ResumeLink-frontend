import Image from 'next/image';

import { Typography } from '@/components/common';
import Container from '@/layouts/Container';
import Wrapper from '@/layouts/Wrapper';

const Header = () => {
  return (
    <Wrapper className="bg-white border-b-gray-20 border-b-1 fixed z-50">
      <Container>
        <div className="flex justify-between h-15">
          <Image src="/images/logo.svg" className="cursor-pointer" width={120} height={21} alt="logo" />
        </div>
        <div className="flex justify-between items-center h-[35px]">
          <div className="flex gap-5">
            <Typography type="body2" className="cursor-pointer">
              개발자 허브
            </Typography>
          </div>
          <div className="flex gap-5">
            <Typography type="body2" className="cursor-pointer">
              로그인
            </Typography>
            <Typography type="body2" className="cursor-pointer">
              회원가입
            </Typography>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Header;
