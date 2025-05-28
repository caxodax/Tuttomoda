import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Category, SiteConfig } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, refetch: fetchProducts };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, refetch: fetchCategories };
};

const defaultSettings: SiteConfig = {
  storeName: 'tuttomoda',
  logo: '/logo.png',
  phone: '+1234567890',
  whatsapp: '+1234567890',
  email: 'info@tuttomoda.com',
  address: 'Calle Principal #123, Ciudad',
  socialMedia: {
    instagram: 'https://instagram.com/tuttomoda',
    facebook: 'https://facebook.com/tuttomoda',
    twitter: 'https://twitter.com/tuttomoda'
  }
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setSettings({
          storeName: data.store_name || defaultSettings.storeName,
          logo: data.logo_url || defaultSettings.logo,
          phone: data.phone || defaultSettings.phone,
          whatsapp: data.whatsapp || defaultSettings.whatsapp,
          email: data.email || defaultSettings.email,
          address: data.address || defaultSettings.address,
          socialMedia: {
            instagram: data.instagram || defaultSettings.socialMedia.instagram,
            facebook: data.facebook || defaultSettings.socialMedia.facebook,
            twitter: data.twitter || defaultSettings.socialMedia.twitter
          }
        });
      } else {
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Error al cargar la configuración');
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, error, refetch: fetchSettings };
};