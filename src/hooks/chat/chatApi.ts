import toast from 'react-hot-toast';

import type { ChatRoom, CoffeeChat, Message, Pagination } from '@/constants/chat';

export async function fetchApi<T>(
  url: string,
  options: RequestInit = {},
  { showToast = true } = {},
): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  let responseBody: unknown;
  let rawText = '';

  try {
    responseBody = await res.clone().json();
  } catch {
    rawText = await res.text();
  }

  if (!res.ok) {
    const serverMsg =
      typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody
        ? (responseBody as { message?: string }).message
        : rawText || 'Unknown Error';

    const error = new FetchApiError(`HTTP ${res.status} – ${serverMsg}`, res.status, url);

    if (showToast) {
      toast.error(`요청 실패: ${serverMsg}`);
    }

    throw error;
  }

  if (typeof responseBody === 'object' && responseBody !== null && 'data' in responseBody) {
    if (showToast) toast.success('요청이 성공적으로 완료되었습니다.');
    return (responseBody as { data: T }).data;
  }

  throw new FetchApiError('응답 형식이 올바르지 않습니다.', res.status, url);
}

export class FetchApiError extends Error {
  public status: number;
  public api: string;

  constructor(message: string, status: number, api: string) {
    super(message);
    this.name = 'FetchApiError';
    this.status = status;
    this.api = api;
  }
}
/**
 * 커피챗 생성
 */
export const createCoffeeChat = (receiverId: string) =>
  fetchApi<CoffeeChat>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats`, {
    method: 'POST',
    body: JSON.stringify({ receiverId }),
  });
/**
 * 커피챗 목록 조회
 */
export const getCoffeeChats = () =>
  fetchApi<CoffeeChat[]>(
    `${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats?type=received`,
    {},
    { showToast: false },
  );

/**
 * 커피챗 상세 조회
 */
export const getCoffeeChatDetail = (id: string) =>
  fetchApi<CoffeeChat>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats/${id}`, {}, { showToast: false });

/**
 * 커피챗 상태 변경
 */
export const updateCoffeeChatStatus = (id: string, status: 'accepted' | 'rejected') =>
  fetchApi<CoffeeChat>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
/**
 * 커피챗 취소
 */
export const cancelCoffeeChat = (id: string) =>
  fetchApi<void>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats/${id}`, {
    method: 'DELETE',
  });

/**
 * 채팅방 생성
 */
export const createChatRoom = (participantId: string) =>
  fetchApi<ChatRoom>(`${process.env.NEXT_PUBLIC_BASE_API}/chat/rooms`, {
    method: 'POST',
    body: JSON.stringify({ participantId }),
  });

/**
 * 채팅방 목록 조회
 */
export const getChatRooms = () => fetchApi<ChatRoom[]>(`${process.env.NEXT_PUBLIC_BASE_API}/chats/rooms`);

/**
 * 채팅방 상세 조회
 */
export const getChatRoomDetail = (id: string) =>
  fetchApi<ChatRoom>(`${process.env.NEXT_PUBLIC_BASE_API}/chat/rooms/${id}`);

/**
 * 채팅방 메시지 목록 조회
 */
export const getMessages = (roomId: string, page = 1, limit = 20) =>
  fetchApi<{ messages: Message[]; pagination: Pagination }>(
    `${process.env.NEXT_PUBLIC_BASE_API}/chat/rooms/${roomId}/messages?page=${page}&limit=${limit}`,
  );

/**
 * 메시지 전송
 */
export const sendMessage = (
  roomId: string,
  content: string,
  messageType: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT',
) =>
  fetchApi<Message>(`${process.env.NEXT_PUBLIC_BASE_API}/chat/rooms/${roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content, messageType }),
  });

/**
 * 메시지 읽음 처리
 */
export const markMessageAsRead = (roomId: string, messageId: string) =>
  fetchApi<void>(`${process.env.NEXT_PUBLIC_BASE_API}/chat/rooms/${roomId}/messages/${messageId}/read`, {
    method: 'PUT',
  });
