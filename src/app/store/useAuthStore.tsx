import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  setLogin: (token: string) => void;
  setLogout: () => void;
  totalUnreadCount: number;
  setTotalUnreadCount: (countOrUpdater: number | ((prev: number) => number)) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      setLogin: (token) => set({ isLoggedIn: true, token }),
      setLogout: () => set({ isLoggedIn: false, token: null, totalUnreadCount: 0 }),
      totalUnreadCount: 0,
      setTotalUnreadCount: (countOrUpdater) =>
        set((state) => ({
          totalUnreadCount:
            typeof countOrUpdater === 'function' ? countOrUpdater(state.totalUnreadCount) : countOrUpdater,
        })),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
