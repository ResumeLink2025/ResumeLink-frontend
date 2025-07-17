// useChatPanelHandler.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatRoom, CoffeeChat, NewMessageNotification } from '@/constants/chat';
import {
  deleteChatRoomParticipant,
  getChatRoomDetail,
  getChatRooms,
  getCoffeeChats,
  getUnreadCount,
} from '@/features/chat/apis/chatApi';

import {
  connectSocket,
  joinRoom,
  leaveRoom,
  subscribeMessageReadAfterConnect,
  subscribeNewMessage,
  unsubscribeMessageRead,
  unsubscribeNewMessage,
} from '../apis/socket';

// 1. 채팅 목록 fetch 함수
async function fetchAllChatsWithDetails() {
  // 1. 요청/채팅방 동시 fetch
  console.log('getCoffeeChats called');
  const [{ data: rawCoffeeChats }, { data: chatRoomList }] = await Promise.all([
    getCoffeeChats(),
    getChatRooms(),
  ]);

  console.log('getCoffeeChats called2', rawCoffeeChats, chatRoomList);
  const pendingChats = rawCoffeeChats.filter((c) => c.status === 'pending');

  // 3. chattingList(accepted 리스트)
  const chattingList = await Promise.all(
    chatRoomList.map(async (room) => {
      const detailRes = await getChatRoomDetail(room.id);
      const unreadRes = await getUnreadCount(room.id);
      const detail = detailRes.data;
      const unreadCount = unreadRes.data?.unreadCount ?? 0;

      return {
        id: room.id,
        status: 'accepted',
        senderId: detail.participants[0].user.id,
        receiverId: detail.participants[1].user.id,
        sender: detail.participants[0].user,
        receiver: detail.participants[1].user,
        message: detail.lastMessage?.text ?? '',
        unreadCount,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt,
        requester: {}, // 필요하면 채우기
      } as CoffeeChat;
    }),
  );

  // 4. 합치고, 정렬
  const merged = [...pendingChats, ...chattingList].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  console.log(merged, chattingList, chatRoomList);
  return merged;
}

export function useChatPanelHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom | null>(null);
  const prevRoomId = useRef<string | null>(null);

  const queryClient = useQueryClient();

  // 채팅 목록을 react-query로 관리
  console.log('useQuery 호출');
  const { data: chatList = [], refetch: refetchChatList } = useQuery({
    queryKey: ['chatList'],
    queryFn: fetchAllChatsWithDetails,
    enabled: isOpen,
    staleTime: 0,
  });

  // 실시간 새 메시지 수신 핸들러
  const handleNewMessage = useCallback(
    (msg: NewMessageNotification) => {
      // 선택된 채팅방이 아니면 unreadCount 증가, 마지막 메시지 갱신
      queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) =>
        old.map((chat) =>
          chat.id === msg.chatRoomId
            ? {
                ...chat,
                unreadCount: selectedChatId === msg.chatRoomId ? 0 : (chat.unreadCount ?? 0) + 1,
                message: msg.content,
              }
            : chat,
        ),
      );
    },
    [selectedChatId, queryClient],
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
  }, []);

  // 채팅방 진입하면 채팅방 정보 fetch, unreadCount 0 처리
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

        // 1. 입장시 unreadCount 0 처리(입장시점의 selectedChatId로만)
        queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) =>
          old.map((chat) => (chat.id === selectedChatId ? { ...chat, unreadCount: 0 } : chat)),
        );
      } catch {
        setChatRoomInfo(null);
      }
    })();

    // cleanup
    return () => {
      isActive = false;
      unsubscribeMessageRead(handleMessageRead);
    };
  }, [selectedChatId, queryClient]);

  // 채팅방 나가기
  // 1. 채팅방 나가기
  const handleLeaveChat = async () => {
    if (!selectedChatId) return;
    try {
      await deleteChatRoomParticipant(selectedChatId);
      leaveRoom(selectedChatId);

      await queryClient.invalidateQueries({ queryKey: ['chatList'] });
      setSelectedChatId(null);
    } catch (err) {
      console.error('채팅방 참가자 삭제 실패:', err);
    }
  };

  // 2. 뒤로가기
  const handleBackEvent = async () => {
    await queryClient.invalidateQueries({ queryKey: ['chatList'] });

    if (selectedChatId) {
      queryClient.setQueryData<CoffeeChat[]>(['chatList'], (old = []) =>
        old.map((chat) => (chat.id === selectedChatId ? { ...chat, unreadCount: 0 } : chat)),
      );
    }
    setSelectedChatId(null);
  };

  return {
    isOpen,
    setIsOpen,
    selectedChatId,
    setSelectedChatId,
    chatList,
    chatRoomInfo,
    refetchChatList, // 필요시 직접 refetch도 가능
    handleLeaveChat,
    handleBackEvent,
  };
}
