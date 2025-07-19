import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type { NewMessageNotification, SendMessageResult } from '@/constants/chat';

let socket: Socket | null = null;

export function connectSocket(token: string): Socket {
  socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
    auth: { token },
  });

  socket.on('connect', () => {});

  socket.on('disconnect', () => {});

  socket.on('connect_error', () => {});

  return socket;
}

export function joinRoom(chatRoomId: string) {
  socket?.emit('room:join', { chatRoomId }, () => {});
}

interface LeaveRoomResponse {
  success: boolean;
  message: string;
}

export function leaveRoom(chatRoomId: string, callback?: (response: LeaveRoomResponse) => void) {
  if (!socket || !socket.connected) {
    return;
  }
  if (!chatRoomId) {
    return;
  }

  // 마지막 인자로 callback 넘기기 (없으면 빈 함수)
  socket.emit('room:leave', { chatRoomId }, callback ?? (() => {}));
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

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    // 필요하다면 socket = null; // <- 연결 끊고 변수 초기화도 가능
  }
}
