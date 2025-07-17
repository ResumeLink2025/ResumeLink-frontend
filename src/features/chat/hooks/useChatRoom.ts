import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import type { Message } from '@/constants/chat';

import { getMessages } from '../apis/chatApi';
import { subscribeNewMessage, unsubscribeNewMessage } from '../apis/socket';

interface UseChatRoomProps {
  chatId: string;
}

export function useChatRoom({ chatId }: UseChatRoomProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['chatRoomMessages', chatId],
    queryFn: () => getMessages(chatId, 1, 50),
    enabled: !!chatId,
    staleTime: 0,
  });

  const messages: Message[] = (data?.data?.messages ?? [])
    .filter((m) => m.id !== undefined && m.id !== null)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  // 소켓 새 메시지 오면 refetch만 호출
  const handleNewMessage = useCallback(
    (msg: { messageId: string; chatRoomId: string }) => {
      if (msg.chatRoomId !== chatId) return;
      refetch(); // 이 한줄이면 최신!
    },
    [chatId, refetch],
  );

  useEffect(() => {
    subscribeNewMessage(handleNewMessage);
    return () => {
      unsubscribeNewMessage(handleNewMessage);
    };
  }, [handleNewMessage]);

  return {
    messages,
    isLoading,
    refetch,
  };
}
