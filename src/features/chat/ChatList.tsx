import type { CoffeeChat } from '@/constants/chat';
import { useUpdateChatStatus } from '@/hooks/useChatHooks';

interface ChatListProps {
  chats: CoffeeChat[];
  onSelectChat: (id: string) => void;
  onUpdate: () => void;
}

export default function ChatList({ chats, onSelectChat, onUpdate }: ChatListProps) {
  const updateStatus = useUpdateChatStatus();

  const handleStatusChange = (chat: CoffeeChat, status: 'accepted' | 'rejected') => {
    updateStatus.mutate(
      { id: chat.id, status },
      {
        onSuccess: () => {
          onUpdate();
        },
      },
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.length === 0 && <div className="p-4 text-center text-gray-500">채팅이 없습니다.</div>}

      {chats.map((chat) => (
        <div
          key={chat.id}
          className="border-b px-4 py-3"
          // 클릭 시 해당 chat 전달
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                {chat.requester?.profile?.nickname ?? '?'}
              </div>
              <p className="font-medium">{chat.requester?.profile?.nickname ?? '알 수 없음'}</p>
            </div>

            {chat.status === 'pending' && (
              <span className="text-xs bg-yellow-400 text-black px-1 rounded">New</span>
            )}
          </div>

          {chat.status === 'pending' ? (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleStatusChange(chat, 'accepted')}
                className="flex-1 bg-primary text-white text-[13px] py-1 rounded cursor-pointer"
              >
                수락
              </button>
              <button
                onClick={() => handleStatusChange(chat, 'rejected')}
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
