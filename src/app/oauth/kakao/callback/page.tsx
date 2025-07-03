'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      alert('인증 코드가 없습니다.');
      return;
    }

    console.log(code, 'kakao auth code', params, 'params');

    fetch('/api/auth/login/kakao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('로그인 실패');
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('accessToken', data.accessToken);

        router.push('/developersHub?type=resume&sort=popular');
      })
      .catch(() => {
        alert('로그인 실패했습니다.');
      });
  }, [router]);

  return <div>로그인 처리 중...</div>;
}
