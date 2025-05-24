import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AdminUser } from '../types';
import toast from 'react-hot-toast';

interface AdminState {
  user: AdminUser;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  user: {
    username: '',
    isLoggedIn: false,
  },
  
  login: async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      set({ user: { username: email, isLoggedIn: true } });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      set({ user: { username: '', isLoggedIn: false } });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));