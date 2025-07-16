'use client';

import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';
import { Button, Typography } from '@/components/common';
import Input from '@/components/common/Input';

import useLogin from './apis/loginApi';


export default function LoginSection() {
  const router = useRouter();
  const { setLogin } = useAuthStore();
  const { handleLogin, globalError, isLoading } = useLogin(setLogin);

  const [isTypePassword, setIsTypePassword] = useState(true);
  const [errorState, setErrorState] = useState({ id: '', password: '' });
  const [userInfo, setUserInfo] = useState({ id: '', password: '' });


  const togglePasswordType = () => setIsTypePassword((prev) => !prev);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorState({ id: '', password: '' });

    const { id, password } = userInfo;
    const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    let hasError = false;
    if (!regexEmail.test(id)) {
      setErrorState((prev) => ({ ...prev, id: '올바른 이메일 형식을 입력해주세요.' }));
      hasError = true;
    }
    if (password.length < 8) {
      setErrorState((prev) => ({ ...prev, password: '비밀번호를 8자 이상 입력해주세요.' }));
      hasError = true;
    }
    if (hasError) return;

    await handleLogin({ email: id, password });
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    let url = '';
    const params = new URLSearchParams();

    if (provider === 'google') {
      params.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '');
      params.set('redirect_uri', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? '');
      params.set('response_type', 'code');
      params.set('scope', 'openid email profile');
      params.set('access_type', 'offline');
      params.set('prompt', 'consent');
      url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    }

    if (provider === 'kakao') {
      params.set('client_id', process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? '');
      params.set('redirect_uri', process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '');
      params.set('response_type', 'code');
      url = `https://kauth.kakao.com/oauth/authorize?${params}`;
    }

    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-155px)] bg-white">
      <Image src="/images/RESUMELINK.png" alt="RESUMELINK" width={200} height={40} className="mb-8" />

      {globalError && (
        <div className="mb-4 w-full max-w-sm p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {globalError}
        </div>
      )}

      <form className="w-full max-w-sm flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          label="아이디"
          name="id"
          errorMessage={errorState.id}
          value={userInfo.id}
          onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
          size="small"
          placeholder="이메일을 입력해주세요."
        />

        <Input
          label="비밀번호"
          type={isTypePassword ? 'password' : 'text'}
          name="password"
          size="small"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
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

        <Button
          type="submit"
          styleType="primary"
          size="small"
          disabled={isLoading}
          className="text-white hover:bg-yellow-500 transition-colors mt-1"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="flex-1 border border-gray-300 rounded-[10px] py-2 flex items-center justify-center gap-2 hover:bg-gray-25"
          >
            <Image src="/images/google.png" alt="Google" width={16} height={16} />
            <Typography type="body5">Sign in with Google</Typography>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('kakao')}
            className="flex-1 border border-gray-300 rounded-[10px] py-2 flex items-center justify-center gap-2 hover:bg-gray-25"
          >
            <Image src="/images/kakao-talk.png" alt="Kakao" width={20} height={20} />
            <Typography type="body5">Sign in with Kakao</Typography>
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push('/register')}
          className="mt-3 text-[14px] text-gray-500 hover:underline underline-offset-2 cursor-pointer"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
