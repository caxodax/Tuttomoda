/*
  # Add CRUD policies for Categories and Products

  1. Security Updates
    - Add detailed CRUD policies for categories table
    - Add detailed CRUD policies for products table
    - Ensure proper authentication checks
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated all on categories" ON categories;
DROP POLICY IF EXISTS "Allow authenticated read categories" ON categories;
DROP POLICY IF EXISTS "Allow authenticated all on products" ON products;
DROP POLICY IF EXISTS "Allow authenticated read products" ON products;

-- Categories Policies
CREATE POLICY "Enable read access for authenticated users" ON categories
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON categories
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON categories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON categories
  FOR DELETE TO authenticated USING (true);

-- Products Policies
CREATE POLICY "Enable read access for authenticated users" ON products
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON products
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON products
  FOR DELETE TO authenticated USING (true);