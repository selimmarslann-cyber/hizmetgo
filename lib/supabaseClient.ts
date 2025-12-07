/**
 * Supabase Client (Client-Side / Anon Key)
 *
 * Bu dosya sadece CLIENT-SIDE (browser) kullanımı içindir.
 * Sadece anon key kullanır, service role key ASLA kullanılmaz.
 *
 * Kullanım:
 * - Client Components ('use client')
 * - Browser-side kod
 * - Public API çağrıları
 *
 * ASLA kullanma:
 * - Server Components
 * - API Routes
 * - Server Actions
 * - Backend fonksiyonları
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Support both NEXT_PUBLIC_SUPABASE_ANON_KEY and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
  );
}

/**
 * Supabase Client (Anon Key)
 * Client-side kullanım için güvenli anon client
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
