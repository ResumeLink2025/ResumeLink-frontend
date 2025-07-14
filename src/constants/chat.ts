// 커피챗 관련 타입
export interface CoffeeChat {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  sender: User;
  receiver: User;
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
    user: User;
  }>;
  unreadCount: number;
  messages: Message[];
  createdAt: string;
}

// 메시지 타입
export interface Message {
  id: string;
  text: string;
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
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
