import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatRoom, Message } from '@/constants/chat';

import { getMessages } from './apis/chatApi';
import { subscribeNewMessage, unsubscribeNewMessage } from './apis/socket';
import { useSendChatMessage } from './hooks/useSendChatMessage';

interface ChatRoomViewProps {
  chatId: string;
  onBack: () => void;
  onLeaveChat: () => void;
  chatRoomInfo: ChatRoom | null;
}

export default function ChatRoomView({ chatId, onBack, onLeaveChat, chatRoomInfo }: ChatRoomViewProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sendMessage = useSendChatMessage();

  // 1. 초기 및 채팅방 변경 시 메시지 불러오기
  const { data, isLoading } = useQuery({
    queryKey: ['chatRoomMessages', chatId],
    queryFn: () => getMessages(chatId, 1, 20),
    enabled: !!chatId,
  });

  useEffect(() => {
    if (data?.data?.messages) {
      const sorted = [...data.data.messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(), // 오래된 → 최신
      );
      setMessages(sorted);
    }
  }, [data]);

  const handleNewMessage = useCallback((msg: Message) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev;
      const next = [...prev, msg];
      next.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return next;
    });
  }, []);

  // 4. 소켓 메시지 구독 & 해제
  useEffect(() => {
    if (!chatId) return;
    subscribeNewMessage(chatId, handleNewMessage);
    return () => {
      unsubscribeNewMessage(chatId, handleNewMessage);
    };
  }, [chatId, handleNewMessage]);

  // 5. 새 메시지 올 때마다 맨 아래로 스크롤 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 6. 메시지 전송
  const lastSendTime = useRef(0);

  const handleSend = () => {
    const now = Date.now();
    if (now - lastSendTime.current < 1000) return;
    lastSendTime.current = now;

    if (!inputValue.trim()) return;
    console.log('handleSend called');
    sendMessage.mutate({ chatRoomId: chatId, content: inputValue }, { onSuccess: () => setInputValue('') });
  };

  if (!chatRoomInfo) return null;

  return (
    <div className="flex flex-1 flex-col h-full">
      {/* 헤더 */}
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

      {/* 메시지 영역 */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2 space-y-2 text-sm">
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
          ${isMine ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-900'}
        `}
              >
                <span>{m.text || '[내용 없음]'}</span>
                <span className="mt-1 block text-[10px] text-gray-500 text-right">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 ― flex-none 로 고정 */}
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
          />
          <button onClick={handleSend} type="button" className="rounded-r bg-yellow-400 px-3 py-1 text-sm">
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
