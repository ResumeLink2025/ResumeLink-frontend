import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type { Message } from '@/constants/chat';

let socket: Socket | null = null;

export function connectSocket(token: string): Socket {
  console.log(token, '보낸 토큰');
  socket = io('http://localhost:8080', {
    auth: { token },
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
  socket?.emit('room:join', { chatRoomId }, () => {
    console.log(`✅ room ${chatRoomId} joined`);
  });
}

export function leaveRoom(chatRoomId: string) {
  socket?.emit('room:leave', { chatRoomId });
}
export function getSocket() {
  if (!socket) throw new Error('Socket not connected');
  return socket;
}

export const sendRealtimeMessage = (id: string, txt: string) =>
  getSocket().emit('message:send', { chatRoomId: id, content: txt, messageType: 'TEXT' }, () =>
    console.log('[WS] send ack'),
  );

export function subscribeNewMessage(roomId: string, callback: (message: Message) => void) {
  socket?.on(`message:new:${roomId}`, callback);
}
export function unsubscribeNewMessage(roomId: string, callback: (message: Message) => void) {
  socket?.off(`message:new:${roomId}`, callback);
}
