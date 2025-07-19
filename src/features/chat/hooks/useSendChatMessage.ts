import { useMutation } from '@tanstack/react-query';

import type { SendMessageResult } from '@/constants/chat';

import { sendRealtimeMessage } from '../apis/socket';

export function useSendChatMessage() {
  return useMutation({
    mutationFn: ({ chatRoomId, content }: { chatRoomId: string; content: string }) => {
      return new Promise<SendMessageResult>((resolve, reject) => {
        sendRealtimeMessage(chatRoomId, content, (response: SendMessageResult) => {
          if (response.success) {
            resolve(response);
          } else {
            reject(response.message);
          }
        });
      });
    },
    onError: (error: string) => {
      alert(`메시지 전송 실패: ${error}`);
    },
  });
}
