import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  setLogin: (userId: string) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userId: null,
  setLogin: (userId) => set({ isLoggedIn: true, userId }),
  setLogout: () => set({ isLoggedIn: false, userId: null }),
}));
