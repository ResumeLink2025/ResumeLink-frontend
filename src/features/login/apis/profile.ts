export async function getMyProfile(accessToken: string, queryParams?: Record<string, string>) {
  try {
    // 쿼리 파라미터가 있으면 URL에 붙임
    let url = 'http://localhost:8080/api/profiles';
    if (queryParams && Object.keys(queryParams).length > 0) {
      const queryString = new URLSearchParams(queryParams).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // 서버가 JSON 에러 메시지를 주는 경우 처리
      let errorMessage = `Error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch {
        // JSON 파싱 실패 시 무시
      }
      throw new Error(errorMessage);
    }

    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
}
