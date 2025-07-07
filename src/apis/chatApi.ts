import { ChatRoom, CoffeeChat, Message, Pagination } from '@/features/chat/types';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 공통 fetch 함수 대체
 */
async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let errorMessage = 'API 요청 실패';
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (_) {
      // 응답 JSON이 아니면 무시
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

/**
 * 커피챗 생성
 */
export const createCoffeeChat = (receiverId: string, message: string) =>
  fetchApi<CoffeeChat>(`${API_BASE_URL}/coffeechat`, {
    method: 'POST',
    body: JSON.stringify({ receiverId, message }),
  });

/**
 * 커피챗 목록 조회
 */
export const getCoffeeChats = () => fetchApi<CoffeeChat[]>(`${API_BASE_URL}/coffeechat`);

/**
 * 커피챗 상세 조회
 */
export const getCoffeeChatDetail = (id: string) => fetchApi<CoffeeChat>(`${API_BASE_URL}/coffeechat/${id}`);

/**
 * 커피챗 상태 변경
 */
export const updateCoffeeChatStatus = (id: string, status: 'ACCEPTED' | 'REJECTED') =>
  fetchApi<CoffeeChat>(`${API_BASE_URL}/coffeechat/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

/**
 * 커피챗 취소
 */
export const cancelCoffeeChat = (id: string) =>
  fetchApi<void>(`${API_BASE_URL}/coffeechat/${id}`, {
    method: 'DELETE',
  });

/**
 * 채팅방 생성
 */
export const createChatRoom = (participantId: string) =>
  fetchApi<ChatRoom>(`${API_BASE_URL}/chat/rooms`, {
    method: 'POST',
    body: JSON.stringify({ participantId }),
  });

/**
 * 채팅방 목록 조회
 */
export const getChatRooms = () => fetchApi<ChatRoom[]>(`${API_BASE_URL}/chat/rooms`);

/**
 * 채팅방 상세 조회
 */
export const getChatRoomDetail = (id: string) => fetchApi<ChatRoom>(`${API_BASE_URL}/chat/rooms/${id}`);

/**
 * 채팅방 메시지 목록 조회
 */
export const getMessages = (roomId: string, page = 1, limit = 20) =>
  fetchApi<{ messages: Message[]; pagination: Pagination }>(
    `${API_BASE_URL}/chat/rooms/${roomId}/messages?page=${page}&limit=${limit}`,
  );

/**
 * 메시지 전송
 */
export const sendMessage = (
  roomId: string,
  content: string,
  messageType: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT',
) =>
  fetchApi<Message>(`${API_BASE_URL}/chat/rooms/${roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content, messageType }),
  });

/**
 * 메시지 읽음 처리
 */
export const markMessageAsRead = (roomId: string, messageId: string) =>
  fetchApi<void>(`${API_BASE_URL}/chat/rooms/${roomId}/messages/${messageId}/read`, { method: 'PUT' });
