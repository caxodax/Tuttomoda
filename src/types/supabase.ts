export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          logo_url: string | null
          store_name: string
          phone: string | null
          whatsapp: string | null
          email: string | null
          address: string | null
          instagram: string | null
          facebook: string | null
          twitter: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          logo_url?: string | null
          store_name: string
          phone?: string | null
          whatsapp?: string | null
          email?: string | null
          address?: string | null
          instagram?: string | null
          facebook?: string | null
          twitter?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          logo_url?: string | null
          store_name?: string
          phone?: string | null
          whatsapp?: string | null
          email?: string | null
          address?: string | null
          instagram?: string | null
          facebook?: string | null
          twitter?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          image_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          images: string[]
          category_id: string | null
          sizes: string[]
          colors: string[]
          is_featured: boolean | null
          is_new: boolean | null
          stock: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          images?: string[]
          category_id?: string | null
          sizes?: string[]
          colors?: string[]
          is_featured?: boolean | null
          is_new?: boolean | null
          stock?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          images?: string[]
          category_id?: string | null
          sizes?: string[]
          colors?: string[]
          is_featured?: boolean | null
          is_new?: boolean | null
          stock?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}