import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { CoffeeChat, Message } from '@/constants/chat';
import * as chatApi from '@/features/chat/apis/chatApi';

// 커피챗 목록 조회
export function useCoffeeChats() {
  return useQuery<CoffeeChat[], Error>({
    queryKey: ['coffeeChats'],
    queryFn: async () => {
      const res = await chatApi.getCoffeeChats();
      return res.data;
    },
  });
}

// 커피챗 상태 변경
export function useUpdateChatStatus(): UseMutationResult<
  CoffeeChat,
  Error,
  { id: string; status: 'accepted' | 'rejected' }
> {
  const qc = useQueryClient();

  return useMutation<CoffeeChat, Error, { id: string; status: 'accepted' | 'rejected' }>({
    mutationFn: ({ id, status }) => chatApi.updateCoffeeChatStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chatList'] });
    },
  });
}

export function useSendMessage(): UseMutationResult<Message, Error, { chatRoomId: string; content: string }> {
  const qc = useQueryClient();

  return useMutation<Message, Error, { chatRoomId: string; content: string }>({
    mutationFn: ({ chatRoomId, content }) => chatApi.sendMessage(chatRoomId, content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['coffeeChats'] });
    },
  });
}
