'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const chattingList = [
  {
    id: 0,
    name: '김민우',
    year: '1',
    developer: '백엔드 개발자',
    isCheck: false,
    chatList: [],
  },
  {
    id: 1,
    name: '테스트',
    isCheck: true,
    year: '4',
    developer: '네트워크 엔지니어',
    chatList: [
      {
        chatId: 0,
        userId: 11,
        message: '안녕하세요',
        time: '2024-06-24T09:00:00',
      },
    ],
  },
  {
    id: 2,
    name: '이현우',
    year: '1',
    developer: '백엔드 개발자',
    isCheck: false,
    chatList: [],
  },
  {
    id: 3,
    name: '김민지',
    isCheck: true,
    year: '10',
    developer: '풀스택 개발자',
    chatList: [
      {
        chatId: 0,
        userId: 11,
        message: '안녕하세요',
        time: '2024-06-24T09:00:00',
      },
      {
        chatId: 1,
        userId: 22,
        message: '네 반가워요',
        time: '2024-06-24T09:01:00',
      },
    ],
  },
  {
    id: 4,
    name: '박성훈',
    isCheck: true,
    year: '1',
    developer: '프론트엔드 개발자',
    chatList: [
      {
        chatId: 0,
        userId: 11,
        message: '안녕하세요',
        time: '2024-06-24T09:00:00',
      },
      {
        chatId: 1,
        userId: 22,
        message: '네 반가워요',
        time: '2024-06-24T09:01:00',
      },
      {
        chatId: 2,
        userId: 22,
        message: '무슨 일로 연락주셨죠?',
        time: '2024-06-24T09:02:00',
      },
      {
        chatId: 3,
        userId: 11,
        message: '아 이력서보고 궁금한점이 생겨서요!',
        time: '2024-06-24T09:03:00',
      },
    ],
  },
];

export default function ChatSidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chats, setChats] = useState(chattingList);
  const [userId] = useState(22);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  //   useEffect(() => {
  //     console.log(chats);
  //   }, [chats]);
  //   useEffect(() => {
  //     console.log(inputValue);
  //   }, [inputValue]);

  const handleAccept = (id: number) => {
    setChats((prev) => prev.map((chat) => (chat.id === id ? { ...chat, isCheck: true } : chat)));
  };

  const handleReject = (id: number) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    setSelectedChatId(null);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || selectedChatId === null) return;

    const newMessage = {
      chatId: chats.find((chat) => chat.id === selectedChatId)?.chatList.length ?? 0,
      userId,
      message: inputValue,
      time: new Date().toISOString(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId ? { ...chat, chatList: [...chat.chatList, newMessage] } : chat,
      ),
    );
    setInputValue('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <>
      {/* 버튼 */}
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

            {/* 리스트 */}
            {!selectedChatId && (
              <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                  <div key={chat.id} className="border-b px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                          {chat.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{chat.name}</p>
                          <p className="text-xs text-gray-500">
                            {chat.year}년차 · {chat.developer}
                          </p>
                        </div>
                      </div>
                      {chat.isCheck && (
                        <div className="text-xs bg-yellow-400 text-black px-1 rounded">New</div>
                      )}
                    </div>
                    {!chat.isCheck ? (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleAccept(chat.id)}
                          className="flex-1 bg-primary text-white text-[13px] py-1 rounded cursor-pointer"
                        >
                          수락
                        </button>
                        <button
                          onClick={() => handleReject(chat.id)}
                          className="flex-1 bg-gray-25 text-black text-[13px] py-1 rounded cursor-pointer"
                        >
                          거절
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => setSelectedChatId(chat.id)}
                        className="w-full text-left text-sm text-gray-600 hover:bg-gray-100 mt-2"
                      >
                        {chat.chatList.length > 0
                          ? chat.chatList[chat.chatList.length - 1].message
                          : '채팅을 시작해주세요!'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 채팅 */}
            {selectedChatId && (
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <button
                    onClick={() => setSelectedChatId(null)}
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    ← 뒤로
                  </button>
                  <p className="font-semibold">{chats.find((c) => c.id === selectedChatId)?.name}</p>
                  <div />
                </div>

                <div className="flex-1 p-3 overflow-y-auto">
                  {chats
                    .find((c) => c.id === selectedChatId)
                    ?.chatList.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
                    .map((msg) => (
                      <div key={msg.chatId} className="mb-2 flex justify-between items-center gap-2 w-full">
                        {msg.userId !== userId ? (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center" />
                              <div className="inline-block bg-gray-200 px-3 py-2 rounded-lg text-sm">
                                {msg.message}
                              </div>
                            </div>
                            <div />
                          </>
                        ) : (
                          <>
                            <div />

                            <div className="flex items-center gap-2">
                              <div className="inline-block bg-yellow-400 text-white px-3 py-2 rounded-lg text-sm">
                                {msg.message}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center" />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>

                <div className="flex p-2 border-t">
                  <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 border rounded-l px-2 py-1 text-sm focus:outline-none"
                  />

                  <button className="bg-yellow-400 px-3 py-1 text-sm rounded-r">전송</button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
