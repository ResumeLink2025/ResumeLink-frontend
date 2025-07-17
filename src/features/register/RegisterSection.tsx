'use client';

import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button, Typography } from '@/components/common';
import Input from '@/components/common/Input';

import useRegister from './hooks/registerApi';

export default function RegisterSection() {
  const { handleRegister, globalError, isLoading } = useRegister();

  const [isTypePassword, setIsTypePassword] = useState(true);
  const [errorState, setErrorState] = useState({ id: '', password: '' });

  const [userInfo, setUserInfo] = useState({ id: '', password: '' });


  const togglePasswordType = () => setIsTypePassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const { id, password } = userInfo;

    const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const emailError = regexEmail.test(id) ? '' : '올바른 형식의 이메일 주소를 입력해주세요.';
    const pwError = password.length >= 8 ? '' : '8글자 이상 입력해주세요.';
    setErrorState({ id: emailError, password: pwError });

    if (emailError || pwError) return;


    await handleRegister({ email: id, password });

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-155px)] bg-white">
      <Image src="/images/RESUMELINK.png" alt="RESUMELINK" width={200} height={40} className="mb-8" />

      <Typography type="title2" className="mb-6">
        회원 가입
      </Typography>

      {globalError && (
        <div className="mb-4 w-full max-w-sm p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {globalError}
        </div>
      )}

      <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="아이디"
          name="id"
          size="small"
          value={userInfo.id}
          errorMessage={errorState.id}
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
        />

        <Input
          label="비밀번호"
          type={isTypePassword ? 'password' : 'text'}
          name="password"
          size="small"
          value={userInfo.password}
          placeholder="비밀번호"
          errorMessage={errorState.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
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
          size="small"
          disabled={isLoading}
          className="w-full mt-2 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 transition"
        >
          {isLoading ? '가입 중...' : '회원가입'}
        </Button>
      </form>
    </div>
  );
}
