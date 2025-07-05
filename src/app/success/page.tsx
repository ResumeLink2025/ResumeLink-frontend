'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthStore } from '../store/useAuthStore';

export default function SuccessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setLogin = useAuthStore((state) => state.setLogin);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const userId = params.get('userId');

    if (!accessToken || !userId) {
      setError('토큰이나 사용자 ID가 없습니다.');
      return;
    }

    try {
      setLogin(userId);
      router.replace('/developersHub?type=resume&sort=popular');
    } catch {
      setError('유효하지 않은 토큰입니다.');
    }
  }, [router]);

  if (error) {
    return (
      <div style={{ padding: 20, color: 'red' }}>
        <h2>로그인 오류</h2>
        <p>{error}</p>
        <button onClick={() => router.replace('/login')}>로그인 페이지로 이동</button>
      </div>
    );
  }

  return <div>로그인 처리 중입니다...</div>;
}
