// ChatList.tsx
import type { CoffeeChat } from '@/constants/chat';
import { useUpdateChatStatus } from '@/hooks/useChatHooks';

interface ChatListProps {
  chats: CoffeeChat[];
  onSelectChat: (id: string) => void;
  onRefetch: () => void;
}

export default function ChatList({ chats, onSelectChat, onRefetch }: ChatListProps) {
  const updateStatus = useUpdateChatStatus();
  const handleStatusChange = (chat: CoffeeChat, status: 'accepted' | 'rejected') => {
    updateStatus.mutate(
      { id: chat.id, status },
      {
        onSuccess: onRefetch,
      },
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.length === 0 && <div className="p-4 text-center text-gray-500">채팅이 없습니다.</div>}
      {chats.map((chat) => (
        <div key={chat.id} className="border-b px-4 py-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
                {chat.receiver?.profile?.nickname ?? '?'}
              </div>
              <p className="font-medium">{chat.receiver?.profile?.nickname ?? '알 수 없음'}</p>
            </div>
            {chat.status === 'pending' && (
              <span className="rounded bg-yellow-400 px-1 text-xs text-black">New</span>
            )}
          </div>

          {chat.status === 'pending' ? (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleStatusChange(chat, 'accepted')}
                className="flex-1 rounded bg-primary py-1 text-[13px] text-white"
              >
                수락
              </button>
              <button
                onClick={() => handleStatusChange(chat, 'rejected')}
                className="flex-1 rounded bg-gray-25 py-1 text-[13px] text-black"
              >
                거절
              </button>
            </div>
          ) : (
            <div
              onClick={() => onSelectChat(chat.id)}
              className="mt-2 w-full cursor-pointer text-left text-sm text-gray-600 hover:bg-gray-100"
            >
              {chat.message || '채팅을 시작해주세요!'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
