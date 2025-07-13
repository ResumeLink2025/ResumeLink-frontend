'use client';

import { usePathname } from 'next/navigation';

import ChatPage from '@/app/chat/page';
import { useAuthStore } from '@/app/store/useAuthStore';

export default function ChatWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const { isLoggedIn } = useAuthStore();
  if (isAuthPage || !isLoggedIn) return null;

  return <ChatPage />;
}
