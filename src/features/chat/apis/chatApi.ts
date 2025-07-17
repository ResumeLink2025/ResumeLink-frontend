import toast from 'react-hot-toast';

import type {
  ChatRoomListResponse,
  ChatRoomResponse,
  CoffeeChat,
  CoffeeChatListResponse,
  Message,
} from '@/constants/chat';
import { authFetch } from '@/utils/refresh';

export async function fetchApi<T>(
  url: string,
  options: RequestInit = {},
  { showToast = true } = {},
): Promise<T> {
  const token = localStorage.getItem('accessToken');
  console.log(token);
  if (!token) {
    throw new FetchApiError('No access token found', 401, url);
  }
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    try {
      res = await authFetch(url, options);
      console.log(res, 'check');
    } catch {
      if (showToast) toast.error('인증이 만료되었습니다. 다시 로그인해주세요.');
      throw new FetchApiError('Unauthorized', 401, url);
    }
  }
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
    if (showToast) toast.error(`요청 실패: ${serverMsg}`);
    throw error;
  }

  if (typeof responseBody === 'object' && responseBody !== null) {
    if (showToast) toast.success('요청이 성공적으로 완료되었습니다.');
    return responseBody as T;
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
  fetchApi<CoffeeChatListResponse>(
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
  fetchApi<CoffeeChat>(
    `${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
    { showToast: false },
  );

/**
 * 커피챗 취소
 */
export const cancelCoffeeChat = (id: string) =>
  fetchApi<void>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats/${id}`, {
    method: 'DELETE',
  });

/**
 * 채팅방 목록 조회
 */
export const getChatRooms = () =>
  fetchApi<ChatRoomListResponse>(`${process.env.NEXT_PUBLIC_BASE_API}/chats/rooms`, {}, { showToast: false });

/**
 * 채팅방 상세 조회
 */
export const getChatRoomDetail = (id: string) =>
  fetchApi<ChatRoomResponse>(
    `${process.env.NEXT_PUBLIC_BASE_API}/chats/rooms/${id}`,
    {},
    { showToast: false },
  );

/**
 * 채팅방 메시지 목록 조회
 */
export const getMessages = (roomId: string, page = 1, limit = 20) =>
  fetchApi<{
    success: boolean;
    message: string;
    data: {
      messages: Message[];
      hasMore: boolean;
      total: number;
    };
  }>(
    `${process.env.NEXT_PUBLIC_BASE_API}/chats/rooms/${roomId}/messages?page=${page}&limit=${limit}`,
    {},
    { showToast: false },
  );

/**
 * 메시지 전송
 */
export const sendMessage = (
  roomId: string,
  content: string,
  messageType: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT',
) =>
  fetchApi<Message>(
    `${process.env.NEXT_PUBLIC_BASE_API}/chats/rooms/${roomId}/messages`,
    {
      method: 'POST',
      body: JSON.stringify(
        messageType === 'TEXT'
          ? { text: content, messageType }
          : {
              messageType,
              fileUrl: content,
              fileName: 'filename.ext',
              fileSize: 1234,
            },
      ),
    },
    { showToast: false },
  );

/**
 * 메시지 읽음 처리
 */

export const deleteChatRoomParticipant = (chatRoomId: string) =>
  fetchApi<void>(`${process.env.NEXT_PUBLIC_BASE_API}/chats/rooms/${chatRoomId}/participants`, {
    method: 'DELETE',
  });

export async function getUnreadCount(roomId: string): Promise<{ data: { unreadCount: number } }> {
  const response = await fetchApi<{ data: { unreadCount: number } }>(
    `${process.env.NEXT_PUBLIC_BASE_API}/chats/rooms/${roomId}/unread-count`,
    {},
    { showToast: false },
  );
  return { data: response.data }; // <= 한 번 더 .data로!
}
