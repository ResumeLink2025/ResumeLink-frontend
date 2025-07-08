import type { CoffeeChat } from '@/constants/chat';
import { useCancelChat, useUpdateChatStatus } from '@/hooks/useChatHooks';

interface ChatListProps {
  chats: CoffeeChat[];
  onSelectChat: (id: string) => void;
  onUpdate: () => void; // ✅ 추가
}

export default function ChatList({ chats, onSelectChat, onUpdate }: ChatListProps) {
  const updateStatus = useUpdateChatStatus();
  const cancelChat = useCancelChat();

  const handleAccept = (id: string) => {
    updateStatus.mutate(
      { id, status: 'accepted' },
      {
        onSuccess: () => {
          console.log('수락 성공');
          onUpdate(); // ✅ 리스트 다시 불러오기
        },
      },
    );
  };

  const handleReject = (id: string) => {
    cancelChat.mutate(id, {
      onSuccess: () => {
        console.log('거절 성공');
        onUpdate(); // ✅ 리스트 다시 불러오기
      },
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.length === 0 && <div className="p-4 text-center text-gray-500">채팅이 없습니다.</div>}

      {chats.map((chat) => (
        <div key={chat.id} className="border-b px-4 py-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                {chat.receiver?.profile?.nickname?.[0] ?? '?'}
              </div>
              <div>
                <p className="font-medium">{chat.receiver?.profile?.nickname ?? '알 수 없음'}</p>
              </div>
            </div>
            {chat.status === 'pending' && (
              <div className="text-xs bg-yellow-400 text-black px-1 rounded">New</div>
            )}
          </div>

          {chat.status === 'pending' ? (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleAccept(chat.id)}
                className="flex-1 bg-primary text-white text-[13px] py-1 rounded cursor-pointer"
              >
                수락
              </button>
              <button
                onClick={() => handleReject(chat.id)}
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
