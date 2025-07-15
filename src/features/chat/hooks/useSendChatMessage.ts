import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FetchApiError, sendMessage } from '../apis/chatApi';
import { sendRealtimeMessage } from '../apis/socket';

export function useSendChatMessage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatRoomId, content }: { chatRoomId: string; content: string }) => {
      sendRealtimeMessage(chatRoomId, content);

      console.log(chatRoomId, content);
      return await sendMessage(chatRoomId, content, 'TEXT');
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ['chatRoomMessages', variables.chatRoomId] });
    },
    onError: (error: unknown, variables) => {
      console.error('메시지 저장 실패 – 롤백 필요', variables);
      if (error instanceof FetchApiError) {
        console.error(`[${error.api}] ${error.status} – ${error.message}`);
        alert(`메시지 전송 실패 (${error.status}) : ${error.message}`);
      } else {
        console.error('알 수 없는 오류', error);
        alert('메시지 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    },
  });
}
