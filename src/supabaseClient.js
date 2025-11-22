import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oqktzyxgqqhzfytqygqk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3R6eXhncXFoemZ5dHF5Z3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMjcyMzgsImV4cCI6MjA3ODcwMzIzOH0.kbE-iOpsqPrCGvhTkd9NVmU5njiyNGs9kG70CuAEEzM";

export const supabase = createClient(supabaseUrl, supabaseKey);
