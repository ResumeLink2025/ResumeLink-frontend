import { useAuthStore } from '@/app/store/useAuthStore';

export async function authFetch(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem('accessToken');

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status !== 401) {
    return res;
  }

  const refreshRes = await fetch('http://localhost:8080/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!refreshRes.ok) {
    localStorage.removeItem('accessToken');
    useAuthStore.getState().setLogout();
    return res;
  }

  const refreshData = await refreshRes.json();
  const newAccessToken = refreshData.accessToken;

  if (typeof newAccessToken !== 'string') {
    localStorage.removeItem('accessToken');
    useAuthStore.getState().setLogout();
    return res;
  }

  localStorage.setItem('accessToken', newAccessToken);
  useAuthStore.getState().setLogin(newAccessToken);

  res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${newAccessToken}`,
    },
  });

  return res;
}
