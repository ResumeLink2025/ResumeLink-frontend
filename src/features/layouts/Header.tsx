'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { routeMainPage } from '@/constants/routes';
import Container from '@/layouts/Container';
import Wrapper from '@/layouts/Wrapper';

import NavLink from './components/NavLink';
import useHeader from './hooks/useHeader';

const Header = () => {
  const { isLoggedIn, isMenuOpen, isMounted, toggleMenu, handleLogout } = useHeader();

  return (
    <Wrapper className="bg-white border-b-gray-20 border-b-1 fixed z-50 px-4">
      <Container>
        <div className="flex justify-between h-15">
          <Link href={routeMainPage} className="flex items-center">
            <Image src="/images/logo.svg" width={120} height={21} alt="logo" />
          </Link>
        </div>

        <div className="hidden list-xs:flex justify-between items-center h-[35px]">
          <div className="hidden list-xs:flex gap-2">
            {isLoggedIn && (
              <>
                <NavLink navHref="/developersHub" title="개발자 허브" />
                <NavLink navHref="/resume/create" title="이력서 생성" />
                <NavLink navHref="/project/create" title="프로젝트 작성" />
                <NavLink navHref="/mypage" title="마이 페이지" />
              </>
            )}
          </div>
          {isMounted && (
            <div className="hidden list-xs:flex gap-5">
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

        <div className="list-xs:hidden flex justify-end mb-2">
          <button className="list-xs:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col gap-3 z-40 md:hidden">
              {isLoggedIn && (
                <>
                  <NavLink navHref="/developersHub" title="개발자 허브" onClick={toggleMenu} />
                  <NavLink navHref="/resume/create" title="이력서 생성" onClick={toggleMenu} />
                  <NavLink navHref="/project/create" title="프로젝트 작성" onClick={toggleMenu} />
                  <NavLink navHref="/mypage" title="마이 페이지" onClick={toggleMenu} />
                </>
              )}

              {isMounted && (
                <>
                  {isLoggedIn ? (
                    <Link href="/" className="font-medium text-[16px]" onClick={handleLogout}>
                      로그아웃
                    </Link>
                  ) : (
                    <>
                      <Link onClick={toggleMenu} href="/login" className="font-medium text-[16px]">
                        로그인
                      </Link>
                      <Link onClick={toggleMenu} href="/register" className="font-medium text-[16px]">
                        회원가입
                      </Link>
                    </>
                  )}
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
