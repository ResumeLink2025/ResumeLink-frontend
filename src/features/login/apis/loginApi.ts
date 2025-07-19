import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { post } from '@/apis/httpClient';

type LoginParams = {
  email: string;
  password: string;
};

export default function useLogin(setLogin: (token: string) => void) {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async ({ email, password }: LoginParams) => {
    setIsLoading(true);
    setGlobalError('');

    try {
      const { accessToken } = await post<{ accessToken: string }>('/api/auth/login/local', {
        email,
        password,
      });

      if (!accessToken) {
        setGlobalError('로그인 응답에 문제가 있습니다. 다시 시도해주세요.');
        return;
      }

      localStorage.setItem('accessToken', accessToken);
      setLogin(accessToken);

      router.replace('/developersHub?type=resume&sort=popular');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      if (error.response?.status === 401) {
        setGlobalError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (error.response?.data?.message) {
        setGlobalError(error.response.data.message ?? '로그인 실패');
      } else {
        setGlobalError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, globalError, isLoading };
}
