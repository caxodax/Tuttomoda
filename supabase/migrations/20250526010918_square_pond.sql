/*
  # Add slider flag to products table

  1. Changes
    - Add `is_slider` boolean column to products table with default false
*/

ALTER TABLE products ADD COLUMN IF NOT EXISTS is_slider boolean DEFAULT false;