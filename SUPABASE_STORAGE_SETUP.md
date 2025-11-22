# Supabase Storage Setup Guide

## Image Upload Permission Issue - Solution

Agar aapko **"Permission denied"** error aa raha hai, to yeh steps follow karein:

### Step 1: Supabase Dashboard mein jao
1. [Supabase Dashboard](https://app.supabase.com) mein login karein
2. Apni project select karein

### Step 2: Storage Bucket Create/Check karein
1. Left sidebar mein **"Storage"** click karein
2. Agar **"product-images"** bucket nahi hai, to:
   - **"New bucket"** button click karein
   - Name: `product-images`
   - **Public bucket**: ✅ Enable karein (important!)
   - **"Create bucket"** click karein

### Step 3: Storage Policies Set karein

Storage bucket ke andar **"Policies"** tab mein jao aur yeh policies add karein:

#### Policy 1: Allow Public Upload (INSERT)
```sql
-- Policy Name: Allow public uploads
-- Operation: INSERT

(
  bucket_id = 'product-images'::text
)
```

Ya SQL Editor mein yeh query run karein:

```sql
-- Allow anyone to upload images
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'product-images'
);

-- Allow anyone to read images
CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'product-images'
);

-- Allow anyone to delete their own images (optional)
CREATE POLICY "Allow public deletes"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'product-images'
);
```

### Step 4: Alternative - Quick Fix (Supabase Dashboard)

1. **Storage** → **Policies** tab
2. **"product-images"** bucket select karein
3. **"New Policy"** click karein
4. **"Create a policy from scratch"** select karein
5. Policy Name: `Allow public uploads`
6. Allowed operation: **INSERT**
7. Target roles: **public** (or **anon**)
8. Policy definition:
   ```sql
   (bucket_id = 'product-images')
   ```
9. **"Review"** aur **"Save policy"** click karein

Yeh same policy **SELECT** operation ke liye bhi create karein (public reads ke liye)

### Step 5: Verify Bucket is Public

1. Storage → Buckets
2. **"product-images"** bucket par click karein
3. Settings mein check karein ke **"Public"** toggle ON hai

### Important Notes:
- Bucket **must be public** for anonymous uploads
- Policies **must allow public/anon** role
- Agar aap authentication use kar rahe ho, to authenticated users ke liye policies bhi add karein

### Test karne ke baad:
- Browser console check karein (F12)
- Agar error aaye to exact error message share karein

