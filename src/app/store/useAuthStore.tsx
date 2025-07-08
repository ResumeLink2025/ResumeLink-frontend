import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  setLogin: (token: string) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  setLogin: (token) => set({ isLoggedIn: true, token }),
  setLogout: () => set({ isLoggedIn: false, token: null }),
}));
