'use client';

import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button, Typography } from '@/components/common';
import Input from '@/components/common/Input';

export default function LoginSection() {
  const [errorState, setErrorState] = useState({
    id: '',
    password: '',
  });
  const [isTypePassword, setIsTypePassword] = useState(true);

  const onClickChangeType = () => {
    setIsTypePassword(!isTypePassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const id = formData.get('id') as string;
    const password = formData.get('password') as string;

    const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!regexEmail.test(id)) {
      setErrorState((prevState) => ({ ...prevState, id: '올바른 형식의 이메일 주소를 입력해주세요.' }));
    } else {
      setErrorState((prevState) => ({ ...prevState, id: '' }));
    }

    if (password.length < 8) {
      setErrorState((prevState) => ({ ...prevState, password: '8글자 이상 입력해주세요.' }));
    } else {
      setErrorState((prevState) => ({ ...prevState, password: '' }));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <Typography type="hero1" className="text-yellow-400 mb-8">
        RESUMELINK
      </Typography>
      <form className="w-full max-w-sm flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Input
            label="아이디"
            name="id"
            errorMessage={errorState.id}
            size="small"
            placeholder="이메일을 입력해주세요."
            className="mb-2"
          />
          <Input
            label="비밀번호"
            type={isTypePassword ? 'password' : 'text'}
            size="small"
            name="password"
            placeholder="비밀번호"
            errorMessage={errorState.password}
            className="cursor-pointer mb-1"
            icon={
              isTypePassword ? (
                <EyeOff size={20} onClick={onClickChangeType} />
              ) : (
                <Eye size={20} onClick={onClickChangeType} />
              )
            }
          />
        </div>
        <Button
          type="submit"
          className="text-white rounded hover:bg-yellow-500 transition-colors"
          styleType="primary"
          size="small"
        >
          로그인
        </Button>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="flex-1 border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            <Image src="/images/google.png" alt="Google" width={16} height={16} />
            <Typography type="body5">Sign in with Google</Typography>
          </button>

          <button
            type="button"
            className="flex-1 border border-gray-300 rounded flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            <Image src="/images/kakao-talk.png" alt="Kakao" width={20} height={20} />
            <Typography type="body5">Sign in with Kakao</Typography>
          </button>
        </div>
        <button
          type="button"
          className="mt-3 text-[14px] text-gray-500 hover:underline pointer cursor-pointer"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
