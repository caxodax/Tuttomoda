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

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // First try to get existing settings
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1);

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Use the first row if settings exist
        const siteData = data[0];
        setSettings({
          storeName: siteData.store_name,
          logo: siteData.logo_url || '',
          phone: siteData.phone || '',
          whatsapp: siteData.whatsapp || '',
          email: siteData.email || '',
          address: siteData.address || '',
          socialMedia: {
            instagram: siteData.instagram || '',
            facebook: siteData.facebook || '',
            twitter: siteData.twitter || ''
          }
        });
      } else {
        // Set default values if no settings exist
        setSettings({
          storeName: 'Store Name',
          logo: '/logo.png',
          phone: '',
          whatsapp: '',
          email: '',
          address: '',
          socialMedia: {
            instagram: '',
            facebook: '',
            twitter: ''
          }
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Set default values on error
      setSettings({
        storeName: 'Store Name',
        logo: '/logo.png',
        phone: '',
        whatsapp: '',
        email: '',
        address: '',
        socialMedia: {
          instagram: '',
          facebook: '',
          twitter: ''
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, refetch: fetchSettings };
};