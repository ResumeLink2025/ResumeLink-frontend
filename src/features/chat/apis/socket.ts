import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type { NewMessageNotification, SendMessageResult } from '@/constants/chat';

let socket: Socket | null = null;

export function connectSocket(token: string): Socket {
  console.log('connectSocket 실행', token);
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

export function sendRealtimeMessage(
  chatRoomId: string,
  content: string,
  callback?: (response: SendMessageResult) => void,
) {
  if (!socket) {
    console.error('Socket이 연결되지 않았습니다.');
    return;
  }

  socket.emit('message:send', { chatRoomId, content, type: 'TEXT' }, callback);
}

export function subscribeNewMessage(callback: (message: NewMessageNotification) => void) {
  socket?.on('message:new', (msg: NewMessageNotification) => {
    callback(msg);
  });
}

export function unsubscribeNewMessage(callback: (message: NewMessageNotification) => void) {
  socket?.off('message:new', callback);
}

export function subscribeMessageRead(
  callback: (payload: { chatRoomId: string; messageId: string; userId: string }) => void,
) {
  socket?.on('message:read', callback);
}

export function unsubscribeMessageRead(
  callback: (payload: { chatRoomId: string; messageId: string; userId: string }) => void,
) {
  socket?.off('message:read', callback);
}

export function subscribeMessageReadAfterConnect(
  callback: (payload: { chatRoomId: string; messageId: string; userId: string }) => void,
) {
  if (!socket) return;
  if (socket.connected) {
    socket.on('message:read', callback);
  } else {
    socket.once('connect', () => {
      socket?.on('message:read', callback);
    });
  }
}
