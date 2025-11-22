-- Supabase Products Table RLS Policies Setup
-- Copy aur paste karein yeh query Supabase SQL Editor mein

-- Step 1: Products table ke liye RLS enable karna (agar already enabled hai to skip karein)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Step 2: Products table ke liye Policies Create karein

-- Policy 1: Allow Public Read (SELECT) - Sabko products dekhne de
CREATE POLICY IF NOT EXISTS "Allow public reads"
ON products
FOR SELECT
TO public
USING (true);

-- Policy 2: Allow Public Insert (INSERT) - Sabko products add karne de
CREATE POLICY IF NOT EXISTS "Allow public inserts"
ON products
FOR INSERT
TO public
WITH CHECK (true);

-- Policy 3: Allow Public Update (UPDATE) - Sabko products update karne de (optional)
CREATE POLICY IF NOT EXISTS "Allow public updates"
ON products
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Policy 4: Allow Public Delete (DELETE) - Sabko products delete karne de (optional)
CREATE POLICY IF NOT EXISTS "Allow public deletes"
ON products
FOR DELETE
TO public
USING (true);

-- Verification Query - Policies check karne ke liye
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'products';

-- Note: 
-- Agar aap sirf authenticated users ko allow karna chahte ho, to "public" ki jagah "authenticated" use karein
-- Agar more security chahiye, to specific conditions add kar sakte ho, jaise:
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.uid() IS NOT NULL)

