'use client';

import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';
import { Button, Typography } from '@/components/common';
import Input from '@/components/common/Input';

const LoginSection = () => {
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);

  const [errorState, setErrorState] = useState({ id: '', password: '' });

  const [globalError, setGlobalError] = useState('');
  const [isTypePassword, setIsTypePassword] = useState(true);

  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  });

  const togglePasswordType = () => {
    setIsTypePassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/auth/login/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.id,
          password: userInfo.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          setGlobalError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          setGlobalError(errorData.message || '로그인 실패');
        }
        return;
      }

      const data = await response.json();
      const accessToken = data.accessToken;

      if (!accessToken) {
        setGlobalError('로그인 응답에 문제가 있습니다. 다시 시도해주세요.');
        return;
      }

      localStorage.setItem('accessToken', accessToken);
      setLogin(accessToken);

      router.replace('/developersHub?type=resume&sort=popular');
    } catch (err) {
      console.error(err);
      setGlobalError('네트워크 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError(''); // 제출 시 기존 글로벌 에러 초기화

    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;

    const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    let hasError = false;

    if (!regexEmail.test(id)) {
      setErrorState((prev) => ({
        ...prev,
        id: '올바른 이메일 형식을 입력해주세요.',
      }));
      hasError = true;
    } else {
      setErrorState((prev) => ({ ...prev, id: '' }));
    }

    if (password.length < 8) {
      setErrorState((prev) => ({
        ...prev,
        password: '비밀번호를 8자 이상 입력해주세요.',
      }));
      hasError = true;
    } else {
      setErrorState((prev) => ({ ...prev, password: '' }));
    }

    if (hasError) return;

    await handleLogin();
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    let url = '';
    let params = new URLSearchParams();

    if (provider === 'google') {
      params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? '',
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
      });
      url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }

    if (provider === 'kakao') {
      params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? '',
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '',
        response_type: 'code',
      });
      url = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
    }

    window.location.href = url;
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-155px)] bg-white">
      <Image src="/images/RESUMELINK.png" alt="RESUMELINK" width={200} height={40} className="mb-8" />

      {/* 글로벌 에러 알림 */}
      {globalError && (
        <div className="mb-4 w-full max-w-sm p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {globalError}
        </div>
      )}

      <form className="w-full max-w-sm flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            label="아이디"
            name="id"
            errorMessage={errorState.id}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                id: e.target.value,
              })
            }
            size="small"
            placeholder="이메일을 입력해주세요."
          />
          <Input
            label="비밀번호"
            type={isTypePassword ? 'password' : 'text'}
            name="password"
            size="small"
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              })
            }
            placeholder="비밀번호"
            errorMessage={errorState.password}
            icon={
              isTypePassword ? (
                <EyeOff size={20} onClick={togglePasswordType} />
              ) : (
                <Eye size={20} onClick={togglePasswordType} />
              )
            }
          />
        </div>

        <Button
          type="submit"
          styleType="primary"
          size="small"
          className="text-white hover:bg-yellow-500 transition-colors mt-1"
        >
          로그인
        </Button>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="flex-1 border border-gray-300 rounded-[10px] py-2 flex items-center justify-center gap-2 hover:bg-gray-25 cursor-pointer"
          >
            <Image src="/images/google.png" alt="Google" width={16} height={16} />
            <Typography type="body5">Sign in with Google</Typography>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('kakao')}
            className="flex-1 border border-gray-300 rounded-[10px] py-2 flex items-center justify-center gap-2 hover:bg-gray-25 cursor-pointer"
          >
            <Image src="/images/kakao-talk.png" alt="Kakao" width={20} height={20} />
            <Typography type="body5">Sign in with Kakao</Typography>
          </button>
        </div>

        <button
          type="button"
          onClick={goToRegister}
          className="mt-3 text-[14px] text-gray-500 hover:underline underline-offset-2 cursor-pointer"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default LoginSection;
