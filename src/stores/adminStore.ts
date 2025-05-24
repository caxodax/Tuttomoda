import { create } from 'zustand';
import { AdminUser } from '../types';

interface AdminState {
  user: AdminUser;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Note: In a real application, authentication would be handled securely with a backend
export const useAdminStore = create<AdminState>((set) => ({
  user: {
    username: '',
    isLoggedIn: false,
  },
  
  login: (username, password) => {
    // Mock authentication - in a real app, this would validate against a secure backend
    if (username === 'admin' && password === 'admin123') {
      set({ user: { username, isLoggedIn: true } });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ user: { username: '', isLoggedIn: false } });
  }
}));