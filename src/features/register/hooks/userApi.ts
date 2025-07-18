export async function getMyProfile(token: string) {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles`, { headers });

  let json;
  try {
    json = await res.json();
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
