import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';

type RegisterParams = {
  email: string;
  password: string;
};

export default function useRegister() {
  const router = useRouter();
  const { setLogin } = useAuthStore();
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleRegister = async ({ email, password }: RegisterParams) => {

    setIsLoading(true);
    setGlobalError('');

    try {
      const res = await fetch('https://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),

      });

      if (!res.ok) {
        const { message } = await res.json();
        setGlobalError(message ?? '회원가입 실패');
        return false;
      }

      const { accessToken } = await res.json();
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setLogin(accessToken);
      }

      router.push('/registerInfo');
      return true;
    } catch {
      setGlobalError('네트워크 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, globalError, isLoading };
}
