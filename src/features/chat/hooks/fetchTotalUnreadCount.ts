import type { ChatRoom } from '@/constants/chat';

import { getChatRooms, getUnreadCount } from '../apis/chatApi';

export async function fetchTotalUnreadCount() {
  const [{ data: chatRoomList }] = await Promise.all([getChatRooms()]);

  const chattingRoomIds: string[] = chatRoomList.map((room: ChatRoom) => room.id);

  const unreadCounts = await Promise.all(
    chattingRoomIds.map((roomId) => getUnreadCount(roomId).then((res) => res.unreadCount ?? 0)),
  );

  return unreadCounts.reduce((sum, cur) => sum + cur, 0);
}
