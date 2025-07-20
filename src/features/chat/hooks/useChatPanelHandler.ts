import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';
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
        unreadCount: unreadRes.unreadCount ?? 0,
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
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom | null>(null);
  const [profile, setProfile] = useState<ProfileType>();
  const prevRoomId = useRef<string | null>(null);

  const setTotalUnreadCount = useAuthStore((s) => s.setTotalUnreadCount);
  const prevTotalUnreadCount = useRef(0);

  const selectedChatIdRef = useRef<string | null>(null);
  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);

  const queryClient = useQueryClient();

  // isFetching 추가!
  const {
    data: chatList = [],
    refetch: refetchChatList,
    isFetching,
  } = useQuery({
    queryKey: ['chatList'],
    queryFn: fetchAllChatsWithDetails,
    enabled: isOpen,
    staleTime: 0,
  });

  // socket 메시지: message만 즉시 반영, unreadCount는 서버값만!
  const handleNewMessage = useCallback(
    (msg: NewMessageNotification) => {
      queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) =>
        old.map((chat) => (chat.id === msg.chatRoomId ? { ...chat, message: msg.content } : chat)),
      );
    },
    [queryClient],
  );

  // 리스너 ref & 중복방지
  const handlerRef = useRef(handleNewMessage);
  useEffect(() => {
    handlerRef.current = handleNewMessage;
  }, [handleNewMessage]);

  useEffect(() => {
    const handler = (msg: NewMessageNotification) => handlerRef.current(msg);
    subscribeNewMessage(handler);
    return () => {
      unsubscribeNewMessage(handler);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    connectSocket(token);

    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setProfile(res);
      } catch {}
    };

    fetchProfile();
  }, []);

  // 마지막 정상 unreadCount만 badge에 노출 (isFetching 중엔 badge 갱신X)
  useEffect(() => {
    const total = chatList.reduce((sum, chat) => sum + (chat.unreadCount ?? 0), 0);
    if (!isFetching && prevTotalUnreadCount.current !== total) {
      setTotalUnreadCount(total);
      prevTotalUnreadCount.current = total;
    }
  }, [chatList, setTotalUnreadCount, isFetching]);

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
      } catch {
        setChatRoomInfo(null);
      }
    })();

    return () => {
      isActive = false;
      unsubscribeMessageRead(handleMessageRead);
    };
  }, [selectedChatId, queryClient]);

  const handleLeaveChat = async () => {
    if (!selectedChatId) return;

    try {
      leaveRoom(selectedChatId, (response) => {
        if (response.success) {
          queryClient.invalidateQueries({ queryKey: ['chatList'] });
          setSelectedChatId(null);
        }
      });
    } catch (err) {
      console.error('채팅방 참가자 삭제 실패:', err);
    }
  };

  const handleBackEvent = async () => {
    await queryClient.invalidateQueries({ queryKey: ['chatList'] });
    setSelectedChatId(null);
  };

  return {
    isOpen,
    setIsOpen,
    selectedChatId,
    setSelectedChatId,
    chatList,
    chatRoomInfo,
    refetchChatList,
    handleLeaveChat,
    handleBackEvent,
    profile,
    isFetching, // 추가!
  };
}
