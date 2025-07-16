import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      const response = await fetch(`http://localhost:8080/api/auth/login/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setGlobalError(
          response.status === 401 ? '이메일 또는 비밀번호가 올바르지 않습니다.' : message ?? '로그인 실패',
        );
        return;
      }

      const { accessToken } = await response.json();
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
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, globalError, isLoading };
}
