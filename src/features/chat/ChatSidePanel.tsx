'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { useChatPanelHandler } from './hooks/useChatPanelHandler';

export default function ChatSidePanel() {
  const {
    isOpen,
    setIsOpen,
    selectedChatId,
    setSelectedChatId,
    chatList,
    chatRoomInfo,
    handleLeaveChat,
    handleBackEvent,
    profile,
    setIsFlag,
  } = useChatPanelHandler();

  const totalUnreadCount = chatList.reduce((sum, chat) => sum + (chat.unreadCount ?? 0), 0);
  if (!profile) return;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-16 right-4 z-[60] rounded-md bg-primary p-4 shadow-lg"
        >
          {/* 뱃지 */}
          {totalUnreadCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-6 h-6 px-2 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow">
              {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
            </span>
          )}
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
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-[300px] flex-col overflow-hidden bg-white shadow-lg"
          >
            <div className="flex items-center justify-between border-b px-4 py-4">
              <Image src="/images/RESUMECHAT.png" alt="RESUMELINK" width={120} height={32} />
              <div></div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {selectedChatId ? (
                <ChatRoom
                  chatId={selectedChatId}
                  chatRoomInfo={chatRoomInfo}
                  onBack={async () => {
                    await handleBackEvent();
                  }}
                  onLeaveChat={handleLeaveChat}
                  profile={profile}
                />
              ) : (
                <ChatList
                  chats={chatList}
                  onSelectChat={setSelectedChatId}
                  profile={profile}
                  setIsFlag={setIsFlag}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
