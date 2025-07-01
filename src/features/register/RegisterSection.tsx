'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button, Typography } from '@/components/common';
import Input from '@/components/common/Input';

export default function RegisterSection() {
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center w-full max-w-md">
        <Typography type="hero1" className=" text-yellow-400 mb-6">
          RESUMELINK
        </Typography>
        <Typography type="title1" className="mb-6">
          회원 가입
        </Typography>

        <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            label="아이디"
            name="id"
            size="small"
            errorMessage={errorState.id}
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

          <Button
            type="submit"
            className="w-full mt-2 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 transition"
            size="small"
          >
            다음
          </Button>
        </form>
      </div>
    </div>
  );
}
