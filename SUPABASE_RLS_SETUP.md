# Supabase Row Level Security (RLS) Setup Guide

## Products Table RLS Policy Error - Solution

Agar aapko **"new row violates row-level security policy"** error aa raha hai, to yeh steps follow karein:

### Quick Fix: SQL Editor Method (Recommended)

1. **Supabase Dashboard** mein jao
   - [Supabase Dashboard](https://app.supabase.com) → Login karein
   - Apni project select karein

2. **SQL Editor** mein jao
   - Left sidebar mein **"SQL Editor"** click karein
   - **"New query"** tab open karein

3. **SQL Query Run karein**
   - `supabase-products-policies.sql` file kholo
   - Uski saari queries copy karke SQL Editor mein paste karo
   - **"Run"** button click karo (ya Ctrl+Enter)

### Method 2: Manual Setup (Dashboard UI)

#### Step 1: Table Editor mein jao
1. Supabase Dashboard → **Table Editor**
2. **"products"** table select karein
3. Top right mein **"..."** menu click karein
4. **"Edit table"** ya **"View policies"** select karein

#### Step 2: RLS Enable karein (agar disabled hai)
1. Table Editor mein **"products"** table
2. Settings icon click karein
3. **"Enable Row Level Security"** toggle ON karein

#### Step 3: Policies Add karein

**Policy 1: Allow Public Read**
1. **Authentication** → **Policies** tab
2. **"products"** table select karein
3. **"New Policy"** click karein
4. **"Create a policy from scratch"** select karein
5. Settings:
   - **Policy name**: `Allow public reads`
   - **Allowed operation**: **SELECT**
   - **Target roles**: **public**
   - **USING expression**: `true`
6. **"Review"** aur **"Save policy"** click karein

**Policy 2: Allow Public Insert**
1. **"New Policy"** click karein
2. Settings:
   - **Policy name**: `Allow public inserts`
   - **Allowed operation**: **INSERT**
   - **Target roles**: **public**
   - **WITH CHECK expression**: `true`
3. **"Review"** aur **"Save policy"** click karein

**Policy 3: Allow Public Update (Optional)**
1. **"New Policy"** click karein
2. Settings:
   - **Policy name**: `Allow public updates`
   - **Allowed operation**: **UPDATE**
   - **Target roles**: **public**
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
3. **"Review"** aur **"Save policy"** click karein

**Policy 4: Allow Public Delete (Optional)**
1. **"New Policy"** click karein
2. Settings:
   - **Policy name**: `Allow public deletes`
   - **Allowed operation**: **DELETE**
   - **Target roles**: **public**
   - **USING expression**: `true`
3. **"Review"** aur **"Save policy"** click karein

### Verification

1. Policies check karein:
   - **Authentication** → **Policies** → **products** table
   - 4 policies dikhni chahiye (SELECT, INSERT, UPDATE, DELETE)

2. Test karein:
   - Apne app mein product add karein
   - Ab error nahi aana chahiye

### Important Notes:

- **Public access**: Agar aap sabko allow karna chahte ho (anonymous users bhi), to `public` role use karein
- **Authenticated only**: Agar sirf logged-in users ko allow karna hai, to `authenticated` role use karein
- **Security**: Production mein agar security important hai, to specific conditions add karein:
  ```sql
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.uid() IS NOT NULL)
  ```

### Common Issues:

**Issue**: Policies already exist
- **Solution**: SQL query mein `IF NOT EXISTS` hai, to safely run kar sakte ho

**Issue**: RLS disabled hai
- **Solution**: Pehle RLS enable karein (SQL mein bhi included hai)

**Issue**: Still getting errors
- **Solution**: Browser console (F12) mein exact error check karein
- Policies tab mein verify karein ke policies properly created hain

