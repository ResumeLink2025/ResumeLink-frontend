import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatRoom, CoffeeChat } from '@/constants/chat';
import {
  deleteChatRoomParticipant,
  FetchApiError,
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

export function useChatPanelHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<CoffeeChat[]>([]);
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom | null>(null);
  const prevRoomId = useRef<string | null>(null);

  // 1. 리스트/방 정보 최초 로딩
  const fetchAllChatsWithDetails = useCallback(async () => {
    try {
      const [{ data: rawCoffeeChats }, { data: chatRoomList }] = await Promise.all([
        getCoffeeChats(),
        getChatRooms(),
      ]);

      const pendingChats = rawCoffeeChats.filter((c) => c.status === 'pending');

      const chatRoomDetailPromises = chatRoomList.map((room) =>
        Promise.all([getChatRoomDetail(room.id), getUnreadCount(room.id)])
          .then(([detailRes, unreadRes]) => {
            const detail = detailRes.data;
            const unreadCount = unreadRes.unreadCount ?? 0;
            return {
              ...detail,
              unreadCount,
            };
          })
          .catch((err) => {
            console.warn(`❌ ${room.id} 처리 실패`, err);
            return null;
          }),
      );

      const chatRoomDetails = await Promise.all(chatRoomDetailPromises);

      const acceptedChats = chatRoomDetails
        .filter((room): room is ChatRoom => room !== null)
        .map((room) => {
          const sender = room.participants[0].user;
          const receiver = room.participants[1].user;
          const requester = {
            id: '',
            authProvider: '',
            createdAt: '',
            email: '',
            profile: {
              nickname: '',
              imageUrl: '',
            },
          };

          return {
            id: room.id,
            status: 'accepted',
            senderId: sender.id,
            receiverId: receiver.id,
            sender,
            receiver,
            requester,
            createdAt: room.createdAt,
            updatedAt: room.createdAt,
            message: room.lastMessage?.text ?? '',
            unreadCount: room.unreadCount ?? 0,
          } as CoffeeChat;
        });

      const chatMap = new Map<string, CoffeeChat>();
      [...pendingChats, ...acceptedChats].forEach((chat) => chatMap.set(chat.id, chat));

      const merged = [...chatMap.values()].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setChatList(JSON.parse(JSON.stringify(merged)));
    } catch (err) {
      if (err instanceof FetchApiError) {
        console.error(`[${err.api}] 요청 실패 – ${err.message}`);
      } else {
        console.error('예기치 못한 에러:', err);
      }
    }
  }, []);

  // 2. 소켓 연결 (최초 1회)
  useEffect(() => {
    fetchAllChatsWithDetails();
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    connectSocket(token);
  }, [fetchAllChatsWithDetails]);

  // 3. 실시간 새 메시지 이벤트 수신 → unreadCount 카톡처럼 관리
  useEffect(() => {
    const handleNewMessage = (message: { chatRoomId: string }) => {
      if (selectedChatId !== message.chatRoomId) {
        setChatList((prev) =>
          prev.map((chat) =>
            chat.id === message.chatRoomId ? { ...chat, unreadCount: (chat.unreadCount ?? 0) + 1 } : chat,
          ),
        );
      }
      // 메시지 리스트 append 등은 별도 관리
    };

    subscribeNewMessage(handleNewMessage);
    return () => {
      unsubscribeNewMessage(handleNewMessage);
    };
  }, [selectedChatId]);

  // 4. 채팅방 입장시: joinRoom + 방 unreadCount 0으로 리셋 + 읽음 리스너 등록
  useEffect(() => {
    if (!selectedChatId) {
      prevRoomId.current = null;
      setChatRoomInfo(null);
      return;
    }

    // 읽음 이벤트 (ex: 서버에서 읽음 처리 됐을 때, 필요에 따라 갱신)
    const handleMessageRead = (payload: { chatRoomId: string; messageId: string; userId: string }) => {
      // 현재 방의 unreadCount 0으로 리셋
      setChatList((prev) =>
        prev.map((chat) => (chat.id === payload.chatRoomId ? { ...chat, unreadCount: 0 } : chat)),
      );
    };

    (async () => {
      try {
        const { data } = await getChatRoomDetail(selectedChatId);
        setChatRoomInfo(data);

        joinRoom(selectedChatId);
        prevRoomId.current = selectedChatId;

        // joinRoom 이후에 읽음 리스너 등록
        subscribeMessageReadAfterConnect(handleMessageRead);

        // (카톡처럼 방 들어오면 미읽음 0으로)
        setChatList((prev) =>
          prev.map((chat) => (chat.id === selectedChatId ? { ...chat, unreadCount: 0 } : chat)),
        );
      } catch {
        setChatRoomInfo(null);
      }
    })();

    return () => {
      unsubscribeMessageRead(handleMessageRead);
    };
  }, [selectedChatId]);

  const handleLeaveChat = async () => {
    if (!selectedChatId) return;
    try {
      await deleteChatRoomParticipant(selectedChatId);
      leaveRoom(selectedChatId);
      setSelectedChatId(null);
    } catch (err) {
      console.error('채팅방 참가자 삭제 실패:', err);
    }
  };

  const handleBackEvent = async () => {
    await fetchAllChatsWithDetails();
    setSelectedChatId(null);
  };

  return {
    isOpen,
    setIsOpen,
    selectedChatId,
    setSelectedChatId,
    chatList,
    chatRoomInfo,
    fetchAllChatsWithDetails,
    handleLeaveChat,
    handleBackEvent,
  };
}
