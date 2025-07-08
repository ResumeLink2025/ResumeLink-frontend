'use client';

import { usePathname } from 'next/navigation';

import ChatPage from '@/app/chat/page';

export default function ChatWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) return null;

  return <ChatPage />;
}
