import type { UserProfileType } from '../shcemas/userProfileSchema';

export async function patchUserProfile(data: UserProfileType) {
  const token = localStorage.getItem('accessToken');

  if (!token) throw new Error('로그인 정보가 없습니다.');

  const sendData: UserProfileType = { ...data };

  const res = await fetch('http://localhost:8080/api/profile/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sendData),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message ?? '프로필 저장 실패');
  }

  return res.json();
}
