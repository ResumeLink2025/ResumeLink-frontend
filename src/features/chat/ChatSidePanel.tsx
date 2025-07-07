'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

export default function ChatSidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <>
      {/* 채팅 열기 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 right-4 z-50 p-4 bg-primary rounded-md shadow-lg cursor-pointer"
      >
        💬
      </button>

      {/* 오버레이 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 사이드 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-50 shadow-lg flex flex-col"
          >
            {/* 헤더 */}
            <div className="flex justify-between items-center px-4 py-4 border-b">
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

            {/* 채팅 리스트 or 채팅방 UI */}
            {!selectedChatId ? (
              <ChatList onSelectChat={setSelectedChatId} />
            ) : (
              <ChatRoom
                chatId={selectedChatId}
                onBack={() => setSelectedChatId(null)}
                onLeaveChat={() => setSelectedChatId(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
