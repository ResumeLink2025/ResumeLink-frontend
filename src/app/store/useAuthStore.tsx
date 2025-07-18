import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  setLogin: (token: string) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      setLogin: (token) => set({ isLoggedIn: true, token }),
      setLogout: () => set({ isLoggedIn: false, token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
