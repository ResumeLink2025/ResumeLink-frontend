'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

export default function SuccessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const userId = params.get('userId');

    if (!accessToken || !userId) {
      setError('토큰이나 사용자 ID가 없습니다.');
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      console.log(decoded, 'decoded');
      console.log(accessToken, 'accessToken');

      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        setError('토큰이 만료되었습니다. 다시 로그인 해주세요.');
        return;
      }

      if (decoded.userId !== userId) {
        setError('토큰 정보와 사용자 ID가 일치하지 않습니다.');
        return;
      }

      // 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);

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
