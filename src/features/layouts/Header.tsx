'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';
import { routeMainPage } from '@/constants/routes';
import { ACCESS_TOKEN } from '@/constants/token';
import Container from '@/layouts/Container';
import Wrapper from '@/layouts/Wrapper';
import LocalStorage from '@/utils/localStorage';

import NavLink from './components/NavLink';

const Header = () => {
  const { isLoggedIn, setLogout, setLogin } = useAuthStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setLogin(storedAccessToken);
    } else {
      setLogout();
    }
  }, [setLogin, setLogout]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        setLogin(data.accessToken);
      } else if (res.status === 401) {
        setLogout();
      }
    })();
  }, [setLogin, setLogout]);

  const handleLogout = () => {
    LocalStorage.removeItem(ACCESS_TOKEN);
    setLogout();
  };

  return (
    <Wrapper className="bg-white border-b-gray-20 border-b-1 fixed z-50 px-4">
      <Container>
        <div className="flex justify-between h-15">
          <Link href={routeMainPage} className="flex items-center">
            <Image src="/images/logo.svg" width={120} height={21} alt="logo" />
          </Link>
        </div>

        <div className="flex justify-between items-center h-[35px]">
          <div className="flex gap-2">
            {isLoggedIn && (
              <>
                <NavLink navHref="/developersHub" title="개발자 허브" />
                <NavLink navHref="/resume/create" title="이력서 생성" />
                <NavLink navHref="/project/create" title="프로젝트 작성" />
                <NavLink navHref="/mypage" title="마이 페이지" />
              </>
            )}
          </div>
          {mounted && (
            <div className="flex gap-5">
              {isLoggedIn ? (
                <Link href="/" className="font-medium text-[16px] leading-[145%]" onClick={handleLogout}>
                  로그아웃
                </Link>
              ) : (
                <>
                  <Link href="/login" className="font-medium text-[16px] leading-[145%]">
                    로그인
                  </Link>
                  <Link href="/register" className="font-medium text-[16px] leading-[145%]">
                    회원가입
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Header;
