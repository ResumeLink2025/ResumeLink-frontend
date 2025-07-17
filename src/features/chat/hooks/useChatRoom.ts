// useChatRoom.ts
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import type { Message } from '@/constants/chat';

import { getMessages } from '../apis/chatApi';
import { subscribeNewMessage, unsubscribeNewMessage } from '../apis/socket';

interface UseChatRoomProps {
  chatId: string;
}

export function useChatRoom({ chatId }: UseChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['chatRoomMessages', chatId],
    queryFn: () => getMessages(chatId, 1, 20),
    enabled: !!chatId,
  });

  useEffect(() => {
    if (data?.data?.messages) {
      const filtered = data.data.messages.filter((m) => m.id !== undefined && m.id !== null);
      const sorted = [...filtered].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      setMessages(sorted);
    }
  }, [data]);

  const handleNewMessage = useCallback(
    async (msg: { messageId: string; chatRoomId: string }) => {
      if (msg.chatRoomId !== chatId) return;

      try {
        const res = await getMessages(chatId, 1, 50);
        const filtered = res.data.messages.filter((m) => m.id !== undefined && m.id !== null);
        const sorted = [...filtered].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        setMessages(sorted);
      } catch (err) {
        console.error('❌ 메시지 불러오기 실패:', err);
      }
    },
    [chatId],
  );

  useEffect(() => {
    console.log('[useEffect] subscribeNewMessage 등록');
    subscribeNewMessage(handleNewMessage);
    return () => {
      console.log('[useEffect] subscribeNewMessage 해제');
      unsubscribeNewMessage(handleNewMessage);
    };
  }, [handleNewMessage]);

  return {
    messages,
    isLoading,
    isSending,
    setIsSending,
    setMessages,
  };
}
