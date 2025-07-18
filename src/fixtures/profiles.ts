export const PROFILE_LIST = Array.from({ length: 2 }).map((_, idx) => ({
  id: idx,
  imageUrl:
    'https://fastly.picsum.photos/id/616/200/200.jpg?hmac=QEzyEzU6nVn4d_vdALhsT9UAtTUEVhwrT-kM5ogBqKM',
  title: '개발자 이상진입니다.',
  description: `저는 ${['프론트엔드', '백엔드', '풀스택'][idx % 3]} 개발자를 희망하고 있습니다. 
  저는 항상 배우고 성장하는 자세로 개발에 임하며, 협업과 커뮤니케이션을 중요하게 생각합니다.`,
  positions: [
    ['프론트엔드 개발자', '웹 개발자'],
    ['백엔드 개발자', '서버 개발자'],
    ['풀스택 개발자', '웹/앱 개발자'],
  ][idx % 3],
  categories: [
    ['긍정적인', '적극적인', '활기찬'],
    ['논리적인', '신중한', '꼼꼼한'],
    ['유연한', '창의적인', '도전적인'],
  ][idx % 3],
  experience: `${idx % 5 === 0 ? '신입' : `${idx}년차`}`,
  avatarUrl:
    'https://fastly.picsum.photos/id/616/200/200.jpg?hmac=QEzyEzU6nVn4d_vdALhsT9UAtTUEVhwrT-kM5ogBqKM',
  author: '이상진',
  likeCount: Math.floor(Math.random() * 100),
  isLiked: false,
}));
