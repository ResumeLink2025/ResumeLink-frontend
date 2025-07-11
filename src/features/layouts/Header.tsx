'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';
import Container from '@/layouts/Container';
import Wrapper from '@/layouts/Wrapper';

import NavLink from './components/NavLink';

const Header = () => {
  const { isLoggedIn, setLogout, setLogin } = useAuthStore();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUserId = localStorage.getItem('userId');

    if (storedAccessToken && storedUserId) {
      setLogin(storedUserId);
    } else {
      setLogout();
    }
  }, [setLogin, setLogout]);

  const handleLogout = () => {
    setLogout();
  };

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
            <NavLink navHref="/resume/create" title="이력서 생성" />
            <NavLink navHref="/project/create" title="프로젝트 작성" />
          </div>
          <div className="flex gap-5">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="cursor-pointer font-medium text-[16px] leading-[145%]">
                  로그인
                </Link>
                <Link href="/register" className="cursor-pointer font-medium text-[16px] leading-[145%]">
                  회원가입
                </Link>
              </>
            ) : (
              <Link
                href="/"
                className="cursor-pointer font-medium text-[16px] leading-[145%]"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Header;
