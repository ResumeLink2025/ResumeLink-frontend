'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatRoom, CoffeeChat, Message } from '@/constants/chat';
import { FetchApiError, getChatRoomDetail, getChatRooms, getCoffeeChats } from '@/features/chat/apis/chatApi';

import {
  connectSocket,
  joinRoom,
  leaveRoom,
  subscribeNewMessage,
  unsubscribeNewMessage,
} from './apis/socket';
import ChatList from './ChatList';
import ChatRoomView from './ChatRoom';
import { chatRoomToCoffeeChat } from './utils/chatRoomToCoffeeChat';

export default function ChatSidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [coffeeChats, setCoffeeChats] = useState<CoffeeChat[]>([]);
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom | null>(null);
  const prevRoomId = useRef<string | null>(null);

  /* -------- 채팅 목록 병합 -------- */
  const fetchAllChatsWithDetails = useCallback(async () => {
    try {
      const [{ data: coffeeChatList }, { data: chatRoomList }] = await Promise.all([
        getCoffeeChats(),
        getChatRooms(),
      ]);

      const acceptedChats = chatRoomList.map(chatRoomToCoffeeChat);
      const filtered = [...coffeeChatList, ...acceptedChats].filter((c) => c.status !== 'rejected');
      const chatMap = new Map<string, CoffeeChat>();
      filtered.forEach((chat) => chatMap.set(chat.id, chat));
      const merged = [...chatMap.values()].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setCoffeeChats(merged);
    } catch (err) {
      if (err instanceof FetchApiError) {
        console.error(`[${err.api}] 요청 실패 – ${err.message}`);
      } else {
        console.error('예기치 못한 에러:', err);
      }
    }
  }, []);

  /* -------- 초기 로딩 & 소켓 연결 -------- */
  useEffect(() => {
    fetchAllChatsWithDetails();

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const socket = connectSocket(token);

    const handleNewMsg = (msg: Message) => {
      // TODO: 메시지 캐시 갱신 (선택)
      console.log('💬 실시간 메시지:', msg);
    };
    subscribeNewMessage(handleNewMsg);

    return () => {
      unsubscribeNewMessage(handleNewMsg);
      socket.disconnect();
    };
  }, [fetchAllChatsWithDetails]);

  /* -------- 채팅방 선택 변화 -------- */
  useEffect(() => {
    if (!selectedChatId) {
      if (prevRoomId.current) leaveRoom(prevRoomId.current);
      prevRoomId.current = null;
      setChatRoomInfo(null);
      return;
    }

    (async () => {
      try {
        const { data } = await getChatRoomDetail(selectedChatId);
        setChatRoomInfo(data);

        if (prevRoomId.current && prevRoomId.current !== selectedChatId) {
          leaveRoom(prevRoomId.current);
        }
        joinRoom(selectedChatId);
        prevRoomId.current = selectedChatId;
      } catch (err) {
        console.error('채팅방 상세 조회 실패:', err);
        setChatRoomInfo(null);
      }
    })();
  }, [selectedChatId]);

  /* ------------------------------ 렌더링 ------------------------------ */
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-16 right-4 z-[60] rounded-md bg-primary p-4 shadow-lg cursor-pointer"
        >
          💬
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 bottom-0 z-50 flex w-[300px] flex-col bg-white shadow-lg"
          >
            <div className="flex items-center justify-between border-b px-4 py-4">
              <Image src="/images/RESUMECHAT.png" alt="RESUMELINK" width={120} height={32} />
              <button
                onClick={() => {
                  if (selectedChatId) setSelectedChatId(null);
                  else setIsOpen(false);
                }}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {selectedChatId ? (
              <ChatRoomView
                chatId={selectedChatId}
                chatRoomInfo={chatRoomInfo}
                onBack={() => setSelectedChatId(null)}
                onLeaveChat={() => setSelectedChatId(null)}
              />
            ) : (
              <ChatList
                chats={coffeeChats}
                onSelectChat={setSelectedChatId}
                onUpdate={fetchAllChatsWithDetails}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
