-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated all on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public read categories" ON categories;
DROP POLICY IF EXISTS "Allow authenticated all on categories" ON categories;
DROP POLICY IF EXISTS "Allow public read products" ON products;
DROP POLICY IF EXISTS "Allow authenticated all on products" ON products;

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text,
  store_name text NOT NULL,
  phone text,
  whatsapp text,
  email text,
  address text,
  instagram text,
  facebook text,
  twitter text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  images text[] DEFAULT '{}',
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  sizes text[] DEFAULT '{}',
  colors text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for site_settings
CREATE POLICY "Allow public read site_settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated all on site_settings" ON site_settings
  FOR ALL TO authenticated USING (true);

-- Create policies for categories
CREATE POLICY "Allow public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated all on categories" ON categories
  FOR ALL TO authenticated USING (true);

-- Create policies for products
CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated all on products" ON products
  FOR ALL TO authenticated USING (true);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert initial site settings
INSERT INTO site_settings (
  store_name,
  logo_url
) VALUES (
  'tuttomoda',
  'https://via.placeholder.com/200x100'
) ON CONFLICT DO NOTHING;