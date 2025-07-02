'use client';

import { useCancelChat, useCoffeeChats, useUpdateChatStatus } from '@/hooks/useChatHooks';

interface ChatListProps {
  onSelectChat: (id: number) => void;
}

export default function ChatList({ onSelectChat }: ChatListProps) {
  const { data, isLoading, error } = useCoffeeChats();
  const updateStatus = useUpdateChatStatus();
  const cancelChat = useCancelChat();

  if (isLoading) return <div className="p-4">로딩중...</div>;
  if (error) return <div className="p-4 text-red-500">에러가 발생했습니다.</div>;

  const chats = data?.data ?? [];

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.length === 0 && <div className="p-4 text-center text-gray-500">채팅이 없습니다.</div>}

      {chats.map((chat) => (
        <div key={chat.id} className="border-b px-4 py-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                {chat.receiver.profile.nickname[0]}
              </div>
              <div>
                <p className="font-medium">{chat.receiver.profile.nickname}</p>
                <p className="text-xs text-gray-500">
                  {/* 예: 1년차 · 백엔드 개발자 (임의 데이터 넣거나 API에서 받으면 적용) */}
                </p>
              </div>
            </div>
            {chat.status === 'PENDING' && (
              <div className="text-xs bg-yellow-400 text-black px-1 rounded">New</div>
            )}
          </div>

          {chat.status === 'PENDING' ? (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatus.mutate({ id: chat.id, status: 'ACCEPTED' })}
                className="flex-1 bg-primary text-white text-[13px] py-1 rounded cursor-pointer"
              >
                수락
              </button>
              <button
                onClick={() => cancelChat.mutate(chat.id)}
                className="flex-1 bg-gray-25 text-black text-[13px] py-1 rounded cursor-pointer"
              >
                거절
              </button>
            </div>
          ) : (
            <div
              onClick={() => onSelectChat(chat.id)}
              className="w-full text-left text-sm text-gray-600 hover:bg-gray-100 mt-2 cursor-pointer"
            >
              {chat.message || '채팅을 시작해주세요!'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
