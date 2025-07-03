import Image from 'next/image';
import Link from 'next/link';

import Container from '@/layouts/Container';
import Wrapper from '@/layouts/Wrapper';

import NavLink from './components/NavLink';

const Header = () => {
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
            <NavLink navHref="/developersHub?type=resume&sort=popular" title="개발자 허브" />
            <NavLink navHref="/resume/create" title="이력서 생성" />
          </div>
          <div className="flex gap-5">
            <Link href="/login" className="font-medium text-[16px] leading-[145%]">
              로그인
            </Link>
            <Link href="/register" className="font-medium text-[16px] leading-[145%]">
              회원가입
            </Link>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Header;
