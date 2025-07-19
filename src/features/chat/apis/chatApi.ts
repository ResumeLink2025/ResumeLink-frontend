import { httpClient, post } from '@/apis/httpClient';
import type {
  ChatRoomListResponse,
  ChatRoomResponse,
  CoffeeChat,
  CoffeeChatListResponse,
  Message,
  UnreadCountResponse,
} from '@/constants/chat';

// 커피챗 생성
export const createCoffeeChat = (receiverId: string) => post<CoffeeChat>('/api/coffee-chats', { receiverId });

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
