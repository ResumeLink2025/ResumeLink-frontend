import type { ChatRoom, CoffeeChat, User } from '@/constants/chat';

export const convertChatRoomsToacceptedCoffeeChats = (chatRooms: ChatRoom[]): CoffeeChat[] => {
  return chatRooms.map((room) => {
    const lastMessage = room.messages[room.messages.length - 1];
    const sender = lastMessage?.sender as User;
    const message = lastMessage?.text || '';

    const receiver = room.participants.find((p) => p.user.id !== sender?.id)?.user as User;

    return {
      id: room.id,
      senderId: sender?.id || '',
      receiverId: receiver?.id || '',
      message,
      status: 'accepted',
      createdAt: room.createdAt,
      updatedAt: lastMessage?.createdAt || room.createdAt,
      sender: {
        id: sender?.id || '',
        email: sender?.email || '',
        profile: {
          nickname: sender?.profile.nickname || '알 수 없음',
          imageUrl: sender?.profile.imageUrl || '',
        },
      },
      receiver: {
        id: receiver?.id || '',
        email: receiver?.email || '',
        profile: {
          nickname: receiver?.profile.nickname || '알 수 없음',
          imageUrl: receiver?.profile.imageUrl || '',
        },
      },
    };
  });
};
