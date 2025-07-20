import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import type { Message, NewMessageNotification } from '@/constants/chat'; // <- NewMessageNotification 명확히 사용

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

  // 콜백 + ref 조합(중복 등록 절대 방지)
  const handleNewMessage = useCallback(
    (msg: NewMessageNotification) => {
      if (msg.chatRoomId !== chatId) return;
      refetch();
    },
    [chatId, refetch],
  );

  const handlerRef = useRef(handleNewMessage);
  useEffect(() => {
    handlerRef.current = handleNewMessage;
  }, [handleNewMessage]);

  useEffect(() => {
    const handler = (msg: NewMessageNotification) => handlerRef.current(msg);
    subscribeNewMessage(handler);
    return () => {
      unsubscribeNewMessage(handler);
    };
  }, []);

  return {
    messages,
    isLoading,
    refetch,
  };
}
