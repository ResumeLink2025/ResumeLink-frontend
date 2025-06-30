import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '@/components/common';
import Container from '@/layouts/Container';
import Wrapper from '@/layouts/Wrapper';

import NavLink from './components/NavLink';

const Header = async () => {
  return (
    <Wrapper className="bg-white border-b-gray-20 border-b-1 fixed z-50">
      <Container>
        <div className="flex justify-between h-15">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.svg" className="cursor-pointer" width={120} height={21} alt="logo" />
          </Link>
        </div>
        <div className="flex justify-between items-center h-[35px]">
          <div className="flex gap-2">
            <NavLink navHref="/developersHub" title="개발자 허브" />
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
