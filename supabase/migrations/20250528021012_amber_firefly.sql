/*
  # Initialize site settings

  1. Changes
    - Insert initial site settings record if none exists
    - Add trigger to ensure only one settings record exists
*/

-- First, ensure the site_settings table exists and has exactly one row
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM site_settings LIMIT 1
  ) THEN
    INSERT INTO site_settings (
      store_name,
      logo_url,
      phone,
      whatsapp,
      email,
      address,
      instagram,
      facebook,
      twitter
    ) VALUES (
      'tuttomoda',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL
    );
  END IF;
END $$;

-- Create a trigger to ensure only one row exists
CREATE OR REPLACE FUNCTION prevent_multiple_settings()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM site_settings) > 0 THEN
    RAISE EXCEPTION 'Only one site settings record is allowed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_single_settings ON site_settings;
CREATE TRIGGER ensure_single_settings
  BEFORE INSERT ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION prevent_multiple_settings();