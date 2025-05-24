import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AdminUser } from '../types';
import toast from 'react-hot-toast';

interface AdminState {
  user: AdminUser;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: AdminUser) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  user: {
    username: '',
    isLoggedIn: false,
  },
  
  setUser: (user) => set({ user }),
  
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });
      
      if (error) {
        toast.error('Credenciales inválidas. Por favor, inténtalo de nuevo.');
        return false;
      }
      
      if (data?.user) {
        set({ user: { username: data.user.email || '', isLoggedIn: true } });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
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
      toast.error('Error al cerrar sesión');
    }
  },
}));