import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatRoom, CoffeeChat, NewMessageNotification, RequesterUser, User } from '@/constants/chat';
import type { ProfileType } from '@/constants/profile';
import {
  getChatRoomDetail,
  getChatRooms,
  getCoffeeChats,
  getUnreadCount,
} from '@/features/chat/apis/chatApi';
import { getMyProfile } from '@/features/login/apis/profile';

import {
  connectSocket,
  joinRoom,
  leaveRoom,
  subscribeMessageReadAfterConnect,
  subscribeNewMessage,
  unsubscribeMessageRead,
  unsubscribeNewMessage,
} from '../apis/socket';

type CoffeeChatWithRoom = CoffeeChat & { chatRoom?: { id: string; message?: string } };

async function fetchAllChatsWithDetails(): Promise<CoffeeChat[]> {
  const [{ data: rawCoffeeChats }, { data: chatRoomList }] = await Promise.all([
    getCoffeeChats(),
    getChatRooms(),
  ]);
  const pendingChats: CoffeeChat[] = rawCoffeeChats.filter((c) => c.status === 'pending');

  const acceptedChatsWithRoom = (rawCoffeeChats as CoffeeChatWithRoom[]).filter(
    (c) => c.status === 'accepted' && c.chatRoom,
  );

  const chattingList: CoffeeChat[] = await Promise.all(
    chatRoomList.map(async (room: ChatRoom) => {
      const detailRes = await getChatRoomDetail(room.id);
      const unreadRes = await getUnreadCount(room.id);

      const detail = detailRes.data;
      return {
        id: room.id,
        status: 'accepted',
        senderId: detail.participants[0]?.user?.id,
        receiverId: detail.participants[1]?.user?.id,
        sender: detail.participants[0]?.user,
        receiver: detail.participants[1]?.user,
        message: detail.lastMessage?.text ?? '',
        unreadCount: unreadRes.data?.unreadCount ?? 0,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt,
        requester: {} as RequesterUser,
      };
    }),
  );

  const acceptedFromCoffeeChat: CoffeeChat[] = acceptedChatsWithRoom.map((c) => ({
    id: c.chatRoom!.id,
    status: 'accepted',
    senderId: c.requester.id,
    receiverId: c.receiverId,
    sender: c.requester as User,
    receiver: c.receiver as User,
    message: c.chatRoom?.message ?? '',
    unreadCount: 0,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt ?? c.createdAt,
    requester: c.requester as RequesterUser,
  }));

  const chattingListAll: CoffeeChat[] = [
    ...chattingList,
    ...acceptedFromCoffeeChat.filter((c) => !chattingList.some((r) => r.id === c.id)),
  ];

  return [...pendingChats, ...chattingListAll].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function useChatPanelHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlag, setIsFlag] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom | null>(null);
  const [profile, setProfile] = useState<ProfileType>();
  const prevRoomId = useRef<string | null>(null);

  const selectedChatIdRef = useRef<string | null>(null);
  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);

  const queryClient = useQueryClient();

  const { data: chatList = [], refetch: refetchChatList } = useQuery({
    queryKey: ['chatList'],
    queryFn: fetchAllChatsWithDetails,
    enabled: isFlag && isOpen,
    staleTime: 0,
  });

  const handleNewMessage = useCallback(
    (msg: NewMessageNotification) => {
      queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) => {
        const updated = old.map((chat) =>
          chat.id === msg.chatRoomId
            ? {
                ...chat,
                unreadCount: selectedChatId === msg.chatRoomId ? 0 : (chat.unreadCount ?? 0) + 1,
                message: msg.content,
              }
            : chat,
        );

        return updated;
      });
    },
    [queryClient],
  );

  useEffect(() => {
    subscribeNewMessage(handleNewMessage);
    return () => {
      unsubscribeNewMessage(handleNewMessage);
    };
  }, [handleNewMessage]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    connectSocket(token);
    setIsFlag(true);
    getMyProfile(token).then((profile) => {
      setProfile(profile); // 상태에 저장
    });
  }, []);

  // 채팅방 진입하면 unreadCount 0 처리
  useEffect(() => {
    if (!selectedChatId) {
      prevRoomId.current = null;
      setChatRoomInfo(null);
      return;
    }

    let isActive = true;

    const handleMessageRead = (payload: { chatRoomId: string; messageId: string; userId: string }) => {
      queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) =>
        old.map((chat) => (chat.id === payload.chatRoomId ? { ...chat, unreadCount: 0 } : chat)),
      );
    };

    (async () => {
      try {
        const { data } = await getChatRoomDetail(selectedChatId);
        if (!isActive) return;
        setChatRoomInfo(data);

        joinRoom(selectedChatId);
        prevRoomId.current = selectedChatId;

        subscribeMessageReadAfterConnect(handleMessageRead);

        // // 입장시 unreadCount 0 처리
        // queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) =>
        //   old.map((chat) => (chat.id === selectedChatId ? { ...chat, unreadCount: 0 } : chat)),
        // );
      } catch {
        setChatRoomInfo(null);
      }
    })();

    return () => {
      isActive = false;
      unsubscribeMessageRead(handleMessageRead);
    };
  }, [selectedChatId, queryClient]);

  // 채팅방 나가기
  const handleLeaveChat = async () => {
    if (!selectedChatId) return;

    try {
      // leaveRoom 호출 시, 콜백으로 성공/실패 처리
      leaveRoom(selectedChatId, (response) => {
        if (response.success) {
          // 성공적으로 나간 경우
          console.log('채팅방에서 성공적으로 나갔습니다.');
          queryClient.invalidateQueries({ queryKey: ['chatList'] });
          setSelectedChatId(null);
        } else {
          // 실패한 경우
          console.error('채팅방 나가기 실패:', response.message);
        }
      });
    } catch (err) {
      console.error('채팅방 참가자 삭제 실패:', err);
    }
  };

  // 뒤로가기
  const handleBackEvent = async () => {
    await queryClient.invalidateQueries({ queryKey: ['chatList'] });
    setSelectedChatId(null);
  };

  return {
    isOpen,
    setIsOpen,
    isFlag,
    setIsFlag,
    selectedChatId,
    setSelectedChatId,
    chatList,
    chatRoomInfo,
    refetchChatList,
    handleLeaveChat,
    handleBackEvent,
    profile,
  };
}
