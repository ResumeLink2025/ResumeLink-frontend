'use client';

import { useSendMessage } from '@/hooks/useChatHooks'; // React Query 훅 경로 맞게 수정
import { useState } from 'react';

interface ChatRoomProps {
  chatId: number;
  onBack: () => void;
  onLeaveChat: () => void;
}

export default function ChatRoom({ chatId, onBack, onLeaveChat }: ChatRoomProps) {
  const [inputValue, setInputValue] = useState('');
  const sendMessage = useSendMessage();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    sendMessage.mutate(
      { chatRoomId: String(chatId), content: inputValue },
      {
        onSuccess: () => setInputValue(''),
      },
    );
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-black">
          ← 뒤로
        </button>
        <p className="font-semibold">채팅방 {chatId}</p>
        <button
          onClick={() => {
            onLeaveChat();
            alert('채팅방을 나갔습니다.');
          }}
          className="text-xs text-red-500 hover:text-red-700"
        >
          방 나가기
        </button>
      </div>

      {/* 메시지 리스트는 fetch나 WebSocket 연결 후 별도로 구현해야 함 */}

      <div className="flex p-2 border-t">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-1 border rounded-l px-2 py-1 text-sm focus:outline-none"
        />
        <button onClick={handleSendMessage} className="bg-yellow-400 px-3 py-1 text-sm rounded-r">
          전송
        </button>
      </div>
    </div>
  );
}
