export async function getMyProfile(accessToken: string, queryParams?: Record<string, string>) {
  try {
    // 쿼리 파라미터가 있으면 URL에 붙임
    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles`;
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

    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
}
