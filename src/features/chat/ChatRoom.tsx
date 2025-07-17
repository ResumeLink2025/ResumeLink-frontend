import { useEffect, useRef, useState } from 'react';

import type { ChatRoom } from '@/constants/chat';

import styles from './ChatRoomView.module.css';
import { useChatRoom } from './hooks/useChatRoom';
import { useSendChatMessage } from './hooks/useSendChatMessage';
interface ChatRoomViewProps {
  chatId: string;
  onBack: () => void;
  onLeaveChat: () => void;
  onMessageSent: () => void;
  chatRoomInfo: ChatRoom | null;
}

export default function ChatRoomView({
  chatId,
  onBack,
  onLeaveChat,
  chatRoomInfo,
  onMessageSent,
}: ChatRoomViewProps) {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading } = useChatRoom({ chatId });

  const sendMessage = useSendChatMessage();
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;
    setIsSending(true);
    try {
      await sendMessage.mutateAsync({ chatRoomId: chatId, content: inputValue });
      onMessageSent();
      setInputValue('');
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!chatRoomInfo) return null;

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex items-center justify-between border-b px-4 py-2 text-sm">
        <button onClick={onBack} className="text-gray-500">
          ← 뒤로
        </button>
        <p className="max-w-[120px] truncate font-semibold">
          {chatRoomInfo.participants[1]?.user.profile.nickname || '알 수 없는 사용자'}
        </p>
        <button onClick={onLeaveChat} className="text-red-500">
          방 나가기
        </button>
      </div>

      <div
        ref={scrollRef}
        className={`flex-1 min-h-0 overflow-y-auto px-4 py-2 space-y-2 text-sm ${styles.scrollArea}`}
        style={{ paddingBottom: '8px' }}
      >
        {isLoading && <p className="text-center text-gray-400">불러오는 중…</p>}
        {!isLoading && messages.length === 0 && (
          <p className="text-center text-gray-400">아직 메시지가 없습니다.</p>
        )}
        {messages.map((m) => {
          const myUserId = chatRoomInfo.participants[0]?.user.id;
          const isMine = m.sender?.id === myUserId;

          return (
            <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`
                  max-w-[70%] rounded-lg px-3 py-2 text-sm
                  ${isMine ? 'bg-primary text-black' : 'bg-gray-200 text-gray-900'}
                `}
              >
                <span>{m.text || '[내용 없음]'}</span>
                <span className="mt-1 block text-[10px] text-gray-500 text-right">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex-none border-t p-2">
        <div className="flex">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="메시지를 입력하세요"
            className="flex-1 rounded-l border px-2 py-1 text-sm outline-none"
            disabled={isSending}
          />
          <button
            onClick={handleSend}
            type="button"
            disabled={isSending}
            className={`rounded-r px-3 py-1 text-sm bg-primary ${
              isSending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
