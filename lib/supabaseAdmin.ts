/**
 * Supabase Admin Client (Server-Side / Service Role Key)
 *
 * Bu dosya sadece SERVER-SIDE kullanımı içindir.
 * Service role key kullanır, tam yetkiye sahiptir.
 *
 * Kullanım:
 * - API Routes (app/api/**)
 * - Server Components
 * - Server Actions
 * - Backend fonksiyonları
 * - Cron jobs
 * - Scripts
 *
 * ASLA kullanma:
 * - Client Components
 * - Browser-side kod
 * - Public-facing kod
 *
 * GÜVENLİK UYARISI:
 * Service role key'e sahip client, tüm veritabanı ve storage'a
 * tam yetkiye sahiptir. Bu dosyayı asla client-side'a expose etme!
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseServiceRoleKey) {
  throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY");
}

/**
 * Supabase Admin Client (Service Role Key)
 * Server-side kullanım için tam yetkili admin client
 *
 * ⚠️ GÜVENLİK: Bu client tam yetkiye sahiptir!
 * Sadece server-side kullanılmalıdır.
 *
 * NOT: Service role key kullanıldığında RLS politikaları bypass edilir.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      apikey: supabaseServiceRoleKey,
    },
  },
});
