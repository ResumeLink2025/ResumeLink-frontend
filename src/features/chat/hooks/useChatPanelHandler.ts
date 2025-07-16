import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatRoom, CoffeeChat, Message } from '@/constants/chat';
import {
  deleteChatRoomParticipant,
  FetchApiError,
  getChatRoomDetail,
  getChatRooms,
  getCoffeeChats,
} from '@/features/chat/apis/chatApi';

import {
  connectSocket,
  joinRoom,
  leaveRoom,
  subscribeNewMessage,
  unsubscribeNewMessage,
} from '../apis/socket';
import { chatRoomToCoffeeChat } from '../utils/chatRoomToCoffeeChat';

export function useChatPanelHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [coffeeChats, setCoffeeChats] = useState<CoffeeChat[]>([]);
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom | null>(null);
  const prevRoomId = useRef<string | null>(null);

  const fetchAllChatsWithDetails = useCallback(async () => {
    try {
      const [{ data: rawCoffeeChats }, { data: chatRoomList }] = await Promise.all([
        getCoffeeChats(),
        getChatRooms(),
      ]);
      const pendingChats = rawCoffeeChats.filter((c) => c.status === 'pending');
      const acceptedChats = chatRoomList.map(chatRoomToCoffeeChat);

      const chatMap = new Map<string, CoffeeChat>();
      [...pendingChats, ...acceptedChats].forEach((chat) => chatMap.set(chat.id, chat));

      const merged = [...chatMap.values()].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setCoffeeChats(merged);
    } catch (err) {
      if (err instanceof FetchApiError) console.error(`[${err.api}] 요청 실패 – ${err.message}`);
      else console.error('예기치 못한 에러:', err);
    }
  }, []);
  useEffect(() => {
    fetchAllChatsWithDetails();
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const socket = connectSocket(token);

    if (!selectedChatId) return;

    const handleNewMsg = (msg: Message) => {
      console.log('실시간 메시지:', msg);
      // 필요 시 메시지 처리 추가
    };

    subscribeNewMessage(selectedChatId, handleNewMsg);

    return () => {
      unsubscribeNewMessage(selectedChatId, handleNewMsg);
      socket.disconnect();
    };
  }, [fetchAllChatsWithDetails, selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) {
      prevRoomId.current = null;
      setChatRoomInfo(null);
      return;
    }
    (async () => {
      try {
        const { data } = await getChatRoomDetail(selectedChatId);
        setChatRoomInfo(data);
        joinRoom(selectedChatId);
        prevRoomId.current = selectedChatId;
      } catch {
        setChatRoomInfo(null);
      }
    })();
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

  return {
    isOpen,
    setIsOpen,
    selectedChatId,
    setSelectedChatId,
    coffeeChats,
    chatRoomInfo,
    fetchAllChatsWithDetails,
    handleLeaveChat,
  };
}
