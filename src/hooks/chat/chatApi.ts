import type { ChatRoom, CoffeeChat, Message, Pagination } from '@/constants/chat';

/**
 * 공통 fetch 함수 대체
 */
async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('accessToken');
  console.log('토큰:', token);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  console.log('응답 상태:', res.status);

  let json: unknown;

  try {
    json = await res.clone().json();
  } catch (err) {
    const text = await res.text();
    console.error('응답이 JSON이 아님:', text, err);
    throw new Error('응답을 JSON으로 파싱할 수 없습니다.');
  }

  if (typeof json === 'object' && json !== null) {
    // json을 객체로 타입 단언
    const obj = json as { message?: string; data?: T };

    if (!res.ok) {
      const errorMessage = obj.message || 'API 요청 실패';
      throw new Error(errorMessage);
    }

    if (obj.data === undefined) {
      throw new Error('응답에 데이터가 없습니다.');
    }

    return obj.data;
  } else {
    throw new Error('응답 형식이 올바르지 않습니다.');
  }
}

/**
 * 커피챗 생성
 */
export const createCoffeeChat = (receiverId: string, message: string) =>
  fetchApi<CoffeeChat>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats`, {
    method: 'POST',
    body: JSON.stringify({ receiverId, message }),
  });

/**
 * 커피챗 목록 조회
 */
export const getCoffeeChats = () =>
  fetchApi<CoffeeChat[]>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats`);

/**
 * 커피챗 상세 조회
 */
export const getCoffeeChatDetail = (id: string) =>
  fetchApi<CoffeeChat>(`${process.env.NEXT_PUBLIC_BASE_API}/coffee-chats/${id}`);

/**
 * 커피챗 상태 변경
 */
export const updateCoffeeChatStatus = (id: string, status: 'ACCEPTED' | 'rejected') =>
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
export const getChatRooms = () => fetchApi<ChatRoom[]>(`${process.env.NEXT_PUBLIC_BASE_API}/chat/rooms`);

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
