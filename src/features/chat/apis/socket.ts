import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type { Message } from '@/constants/chat';

let socket: Socket | null = null;

export function connectSocket(token: string): Socket {
  socket = io('http://localhost:8080', {
    auth: { token: `Bearer ${token}` },
  });

  socket.on('connect', () => {
    console.log('Socket 연결 성공:', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket 연결 해제');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket 연결 에러:', error);
  });

  socket.on('error', (error) => {
    console.error('Socket 에러:', error);
  });

  return socket;
}

export function joinRoom(chatRoomId: string) {
  socket?.emit('joinRoom', { chatRoomId });
}

export function leaveRoom(chatRoomId: string) {
  socket?.emit('leaveRoom', { chatRoomId });
}

export function sendRealtimeMessage(chatRoomId: string, content: string) {
  socket?.emit('sendMessage', {
    chatRoomId,
    content,
    messageType: 'TEXT',
  });
}

export function subscribeNewMessage(callback: (message: Message) => void) {
  socket?.on('newMessage', callback);
}

export function unsubscribeNewMessage() {
  socket?.off('newMessage');
}
