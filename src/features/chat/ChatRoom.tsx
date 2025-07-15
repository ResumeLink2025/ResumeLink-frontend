import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { ChatRoom } from '@/constants/chat';

import { getMessages } from './apis/chatApi';
import { useSendChatMessage } from './hooks/useSendChatMessage';

interface ChatRoomViewProps {
  chatId: string;
  onBack: () => void;
  onLeaveChat: () => void;
  chatRoomInfo: ChatRoom | null;
}

export default function ChatRoomView({ chatId, onBack, onLeaveChat, chatRoomInfo }: ChatRoomViewProps) {
  const [inputValue, setInputValue] = useState('');
  const sendMessage = useSendChatMessage();

  const {
    data: messagesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['chatRoomMessages', chatId],
    queryFn: () => getMessages(chatId, 1, 20),
    enabled: !!chatId,
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    sendMessage.mutate(
      { chatRoomId: chatId, content: inputValue },
      {
        onSuccess: () => {
          setInputValue('');
          refetch(); //
        },
      },
    );
  };

  if (!chatRoomInfo) return null;

  console.log(messagesData, 'chatRoomInfo');
  console.log(isLoading, 'loading');
  // console.log(messagesData?.messages, 'message');
  return (
    <div className="flex flex-col flex-1">
      {/* 헤더 */}
      <div className="flex justify-between items-center px-4 py-2 border-b text-sm">
        <button onClick={onBack} className="text-gray-500 hover:text-black">
          ← 뒤로
        </button>
        <p className="font-semibold truncate max-w-[120px]">
          {chatRoomInfo.participants[0].user.profile.nickname}
        </p>
        <button onClick={onLeaveChat} className="text-red-500 hover:text-red-700">
          방 나가기
        </button>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
        {isLoading && <p className="text-center text-gray-400">불러오는 중…</p>}
        {!isLoading && messagesData?.data?.messages?.length === 0 && (
          <p className="text-gray-400 text-center">아직 메시지가 없습니다.</p>
        )}

        {messagesData?.data?.messages?.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <span className="font-medium">
              {msg.sender?.profile?.nickname || '알 수 없는 사용자'}
              <span className="ml-1 text-[10px] text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </span>
            <span>{msg.text || '[내용 없음]'}</span>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="flex p-2 border-t">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 border rounded-l px-2 py-1 text-sm focus:outline-none"
        />
        <button onClick={handleSendMessage} className="bg-yellow-400 px-3 py-1 text-sm rounded-r">
          전송
        </button>
      </div>
    </div>
  );
}
