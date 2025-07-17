// 커피챗 관련 타입
export interface CoffeeChat {
  id: string;
  senderId?: string;
  receiverId?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  sender: User;
  receiver: User;
  requester: RequesterUser;
  unreadCount?: number;
}

export interface RequesterUser {
  id: string;
  authProvider: string;
  createdAt: string;
  email: string;
  profile: {
    nickname: string;
    imageUrl: string;
  };
}

// 사용자 타입
export interface User {
  id: string;
  email: string;
  profile: {
    nickname: string;
    imageUrl?: string;
  };
}

// 채팅방 타입
export interface ChatRoom {
  id: string;
  participants: Array<{
    id: string;
    userId: string;
    joinedAt: string;
    leftAt: string | null;
    user: User;
  }>;
  coffeeChatId: string;
  unreadCount: number;
  messages: Message[]; // 전체 메시지 배열
  lastMessage?: {
    id: string;
    text: string;
    messageType: 'TEXT' | 'IMAGE' | 'FILE';
    createdAt: string;
    senderId: string;
  };
  createdAt: string;
}

// 메시지 타입
export interface Message {
  id: string;
  text: string;
  messageId: string;

  messageType: 'TEXT' | 'IMAGE' | 'FILE';
  createdAt: string;
  senderId: string;
  chatRoomId: string;
  sender: {
    id: string;
    profile: {
      nickname: string;
      imageUrl?: string;
    };
  };
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// API 응답 타입
export interface ChatRoomListResponse {
  success: boolean;
  message: string;
  data: ChatRoom[];
  total: number;
}
export interface ChatRoomResponse {
  success: boolean;
  message: string;
  data: ChatRoom;
}

export interface CoffeeChatListResponse {
  data: CoffeeChat[];
  total: number;
}
