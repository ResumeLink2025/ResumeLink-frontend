import type { ChatRoom, CoffeeChat } from '@/constants/chat';

export const chatRoomToCoffeeChat = (room: ChatRoom): CoffeeChat => {
  const sender = room.participants[0]?.user;
  const receiver = room.participants[1]?.user;

  return {
    id: room.id,
    senderId: sender?.id,
    receiverId: receiver?.id,
    status: 'accepted',
    createdAt: room.createdAt,
    updatedAt: room.createdAt,
    message: room.messages?.at(-1)?.text ?? '',

    sender: sender ?? {
      id: '',
      email: '',
      profile: { nickname: '', imageUrl: '' },
    },

    receiver: receiver ?? {
      id: '',
      email: '',
      profile: { nickname: '', imageUrl: '' },
    },

    requester: sender
      ? {
          id: sender.id,
          email: sender.email,
          authProvider: 'local', // 임시
          createdAt: room.createdAt, // 임시
          profile: {
            nickname: sender.profile.nickname ?? '',
            imageUrl: sender.profile.imageUrl ?? '',
          },
        }
      : {
          id: '',
          email: '',
          authProvider: 'local',
          createdAt: room.createdAt,
          profile: { nickname: '', imageUrl: '' },
        },
  };
};
