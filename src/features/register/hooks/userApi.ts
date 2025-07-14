export async function getMyProfile(token: string) {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch('http://localhost:8080/api/profile/profile', { headers });

  let json;
  try {
    json = await res.json();
    console.log('프로필 API 응답:', json);
  } catch (e) {
    console.error('프로필 응답 파싱 실패', e);
    json = null;
  }

  if (!res.ok) {
    const message = json?.message || res.statusText || '프로필 조회 실패';
    throw new Error(`HTTP ${res.status} – ${message}`);
  }

  if (!json?.profile) {
    throw new Error('프로필 데이터가 없습니다.');
  }

  return json.profile;
}
