-- Supabase Storage Policies Setup for Image Uploads
-- Copy aur paste karein yeh query Supabase SQL Editor mein

-- Step 1: Ensure bucket exists (agar nahi hai to manually create karein Storage section mein)

-- Step 2: Storage Policies Create karein

-- Policy 1: Allow Public Upload (INSERT) - Sabko upload karne de
CREATE POLICY IF NOT EXISTS "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'product-images'
);

-- Policy 2: Allow Public Read (SELECT) - Sabko images dekhne de
CREATE POLICY IF NOT EXISTS "Allow public reads"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'product-images'
);

-- Policy 3: Allow Public Delete (DELETE) - Optional: Sabko delete karne de
-- Agar sirf authenticated users delete kar sakte ho, to yeh policy skip karein
CREATE POLICY IF NOT EXISTS "Allow public deletes"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'product-images'
);

-- Policy 4: Allow Public Update (UPDATE) - Optional: Agar edit chahiye ho
CREATE POLICY IF NOT EXISTS "Allow public updates"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'product-images'
)
WITH CHECK (
  bucket_id = 'product-images'
);

-- Verification Query - Policies check karne ke liye
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE '%product-images%' OR policyname LIKE '%Allow public%';

-- Note: 
-- 1. Agar bucket PUBLIC nahi hai, to Storage → Buckets → product-images → Settings → Public toggle ON karein
-- 2. Agar errors aaye to pehle existing policies delete karein, phir yeh run karein

