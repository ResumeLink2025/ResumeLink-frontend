import { useAuthStore } from '@/app/store/useAuthStore';

let isRefreshing = false;
let queue: (() => void)[] = [];

export async function authFetch(url: string, options: RequestInit = {}) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status !== 401) {
      return res;
    }

    if (isRefreshing) {
      await new Promise<void>((resolve) => queue.push(resolve));
    } else {
      isRefreshing = true;

      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) {
        localStorage.removeItem('accessToken');
        useAuthStore.getState().setLogout();
        isRefreshing = false;
        queue.forEach((cb) => cb());
        queue = [];
        throw new Error('Refresh failed');
      }

      const refreshData = await refreshRes.json();
      const newAccessToken = refreshData.accessToken;

      if (typeof newAccessToken !== 'string') {
        localStorage.removeItem('accessToken');
        useAuthStore.getState().setLogout();
        isRefreshing = false;
        queue.forEach((cb) => cb());
        queue = [];
        throw new Error('Invalid access token');
      }

      localStorage.setItem('accessToken', newAccessToken);
      useAuthStore.getState().setLogin(newAccessToken);

      isRefreshing = false;
      queue.forEach((cb) => cb());
      queue = [];
    }

    const retryToken = localStorage.getItem('accessToken');
    const retryRes = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${retryToken}`,
      },
    });

    return retryRes;
  } catch (err) {
    console.error('[authFetch] Error:', err);
    throw err;
  }
}
