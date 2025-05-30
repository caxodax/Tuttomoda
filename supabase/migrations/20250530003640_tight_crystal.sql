-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated all on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated all on categories" ON categories;
DROP POLICY IF EXISTS "Allow authenticated read categories" ON categories;
DROP POLICY IF EXISTS "Allow authenticated all on products" ON products;
DROP POLICY IF EXISTS "Allow authenticated read products" ON products;

-- Create public read policies
CREATE POLICY "Allow public read site_settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (true);

-- Create authenticated policies for admin operations
CREATE POLICY "Enable admin operations on site_settings" ON site_settings
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Enable admin operations on categories" ON categories
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Enable admin operations on products" ON products
  FOR ALL TO authenticated USING (true);