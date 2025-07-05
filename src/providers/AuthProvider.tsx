'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setLogin = useAuthStore((state) => state.setLogin);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) setLogin(userId);
  }, [setLogin]);

  return <>{children}</>;
}
