'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ErrorModal from '@/components/common/ErrorModal/ErrorModal';
import { getMyProfile } from '@/features/register/hooks/userApi';

import { useAuthStore } from '../store/useAuthStore';

export default function SuccessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setLogin = useAuthStore((state) => state.setLogin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');

    if (!accessToken) {
      setError('로그인 정보가 유효하지 않습니다. 다시 시도해주세요.');
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        localStorage.setItem('accessToken', accessToken);
        setLogin(accessToken);

        const profile = await getMyProfile(accessToken);
        if (!cancelled) {
          if (profile.nickname === null) {
            router.replace('/registerInfo');
          } else {
            router.replace('/developersHub?type=resume&sort=popular');
          }
        }
      } catch {
        if (!cancelled) {
          setError('프로필 정보를 불러오는데 실패했습니다.');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [setLogin, router]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div>로그인 처리 중입니다...</div>
      {error && <ErrorModal message={error} onClose={() => router.replace('/login')} />}
    </div>
  );
}
