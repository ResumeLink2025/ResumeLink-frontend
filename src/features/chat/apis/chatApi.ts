import toast from 'react-hot-toast';

import { httpClient, post } from '@/apis/httpClient';
import type {
  ChatRoomListResponse,
  ChatRoomResponse,
  CoffeeChat,
  CoffeeChatListResponse,
  Message,
  UnreadCountResponse,
} from '@/constants/chat';

export async function withToast<T>(
  promise: Promise<T>,
  {
    showToast = false,
    successMsg,
    errorMsg,
  }: {
    showToast?: boolean;
    successMsg?: string;
    errorMsg?: string;
  } = {},
): Promise<T> {
  try {
    const data = await promise;
    if (showToast && successMsg) toast.success(successMsg);
    return data;
  } catch (err: unknown) {
    let message = errorMsg || '요청 실패';

    if (typeof err === 'object' && err !== null && 'response' in err) {
      const resp = (err as { response?: unknown }).response;
      if (typeof resp === 'object' && resp !== null && 'data' in resp) {
        const data = (resp as { data?: unknown }).data;
        if (
          typeof data === 'object' &&
          data !== null &&
          'message' in data &&
          typeof (data as { message?: unknown }).message === 'string'
        ) {
          message = (data as { message: string }).message;
        }
      }
    }

    if (showToast) toast.error(message);
    throw err;
  }
}

// 커피챗 생성
export const createCoffeeChat = (receiverId: string, showToast = false) =>
  withToast(post<CoffeeChat>('/api/coffee-chats', { receiverId }), {
    showToast,
    successMsg: '커피챗 신청 완료!',
    errorMsg: '커피챗 신청 실패',
  });

// 커피챗 목록 조회
export const getCoffeeChats = () =>
  httpClient.get<CoffeeChatListResponse>('/api/coffee-chats?type=received').then((res) => res.data);

// 커피챗 상세 조회
export const getCoffeeChatDetail = (id: string) =>
  httpClient.get<CoffeeChat>(`/api/coffee-chats/${id}`).then((res) => res.data);

// 커피챗 상태 변경
export const updateCoffeeChatStatus = (id: string, status: 'accepted' | 'rejected') =>
  httpClient.patch<CoffeeChat>(`/api/coffee-chats/${id}/status`, { status }).then((res) => res.data);

// 커피챗 취소
export const cancelCoffeeChat = (id: string) => httpClient.delete<void>(`/api/coffee-chats/${id}`);

// 채팅방 목록 조회
export const getChatRooms = () =>
  httpClient.get<ChatRoomListResponse>('/api/chats/rooms').then((res) => res.data);

// 채팅방 상세 조회
export const getChatRoomDetail = (id: string) =>
  httpClient.get<ChatRoomResponse>(`/api/chats/rooms/${id}`).then((res) => res.data);

// 채팅방 메시지 목록 조회
export const getMessages = (roomId: string, page = 1, limit = 20) =>
  httpClient
    .get<{
      success: boolean;
      message: string;
      data: { messages: Message[]; hasMore: boolean; total: number };
    }>(`/api/chats/rooms/${roomId}/messages?page=${page}&limit=${limit}`)
    .then((res) => res.data);

// 메시지 전송
export const sendMessage = (
  roomId: string,
  content: string,
  messageType: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT',
) =>
  httpClient
    .post<Message>(
      `/api/chats/rooms/${roomId}/messages`,
      messageType === 'TEXT'
        ? { text: content, messageType }
        : { messageType, fileUrl: content, fileName: 'filename.ext', fileSize: 1234 },
    )
    .then((res) => res.data);

// 채팅방 나가기
export const deleteChatRoomParticipant = (chatRoomId: string) =>
  httpClient.delete<void>(`/api/chats/rooms/${chatRoomId}/participants`);

// 채팅방 안읽은 개수

export const getUnreadCount = (roomId: string) =>
  httpClient.get<UnreadCountResponse>(`/api/chats/rooms/${roomId}/unread-count`).then((res) => res.data.data);
