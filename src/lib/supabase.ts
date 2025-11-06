import { createClient } from "@supabase/supabase-js";

// 👇 Add these console logs for debugging
console.log("🧩 SUPABASE_URL =", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("🧩 SUPABASE_KEY =", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) + "...");

// 🔥 This line throws the error if URL is invalid
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
