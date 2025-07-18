import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import type { ChatRoom } from '@/constants/chat';
import type { ProfileType } from '@/constants/profile';

import styles from './ChatRoomView.module.css';
import { useChatRoom } from './hooks/useChatRoom';
import { useSendChatMessage } from './hooks/useSendChatMessage';

interface ChatRoomViewProps {
  chatId: string;
  onBack: () => void;
  onLeaveChat: () => void;
  chatRoomInfo: ChatRoom | null;
  profile: ProfileType;
}

export default function ChatRoomView({
  chatId,
  onBack,
  onLeaveChat,
  chatRoomInfo,
  profile,
}: ChatRoomViewProps) {
  const [inputValue, setInputValue] = useState('');
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading } = useChatRoom({ chatId });

  const sendMessage = useSendChatMessage();
  const [isSending, setIsSending] = useState(false);

  const queryClient = useQueryClient();

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;
    setIsSending(true);
    try {
      await sendMessage.mutateAsync({ chatRoomId: chatId, content: inputValue });

      queryClient.invalidateQueries({ queryKey: ['chatRoomMessages', chatId] });

      // queryClient.invalidateQueries({ queryKey: ['chatList'] });

      // queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) =>
      //   old.map((chat) => (chat.id === chatId ? { ...chat, message: inputValue, unreadCount: 0 } : chat)),
      // );

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
  const myUserId = profile.profile.id;

  const opponent = chatRoomInfo.participants.find((p) => p.user.id !== myUserId);

  return (
    <div className="flex flex-1 flex-col h-full">
      {/* 상단 바 */}
      <div className="flex items-center justify-between border-b px-4 py-2 text-sm">
        <button onClick={onBack} className="text-gray-500 cursor-pointer">
          ← 뒤로
        </button>
        <p className="max-w-[120px] truncate font-semibold">
          {opponent?.user.profile.nickname || '알 수 없는 사용자'}
        </p>

        <button onClick={() => setShowLeaveConfirm(true)} className="text-red-500 cursor-pointer">
          방 나가기
        </button>
      </div>

      {/* 채팅 메시지 영역 */}
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

      {/* 입력창 */}
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

      {/* 나가기 모달 */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
            <div className="mb-4 text-center text-lg font-semibold">정말 채팅방에서 나가시겠습니까?</div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowLeaveConfirm(false);
                  onLeaveChat();
                }}
                className="px-4 py-2 rounded bg-red-500 text-white  cursor-pointer"
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
