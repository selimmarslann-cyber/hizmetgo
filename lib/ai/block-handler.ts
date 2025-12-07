/**
 * Block Handler
 * Gereksiz sohbet tespitinde kullanıcıyı 30 dakika banlar
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface BlockResult {
  isBlocked: boolean;
  blockedUntil: Date | null;
  remainingMinutes: number;
}

/**
 * Kullanıcıyı 30 dakika banlar
 */
export async function blockUser(userId: string): Promise<void> {
  const blockedUntil = new Date();
  blockedUntil.setMinutes(blockedUntil.getMinutes() + 30);

  // Supabase'de ai_blocks tablosuna yaz
  const { error } = await supabase.from("ai_blocks").upsert(
    {
      user_id: userId,
      blocked_until: blockedUntil.toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    },
  );

  if (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
}

/**
 * Kullanıcının ban durumunu kontrol eder
 */
export async function checkUserBlock(userId: string): Promise<BlockResult> {
  const { data, error } = await supabase
    .from("ai_blocks")
    .select("blocked_until")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned, yani ban yok
    console.error("Error checking user block:", error);
    return {
      isBlocked: false,
      blockedUntil: null,
      remainingMinutes: 0,
    };
  }

  if (!data || !data.blocked_until) {
    return {
      isBlocked: false,
      blockedUntil: null,
      remainingMinutes: 0,
    };
  }

  const blockedUntil = new Date(data.blocked_until);
  const now = new Date();

  if (blockedUntil <= now) {
    // Ban süresi dolmuş, temizle
    await supabase.from("ai_blocks").delete().eq("user_id", userId);
    return {
      isBlocked: false,
      blockedUntil: null,
      remainingMinutes: 0,
    };
  }

  const remainingMinutes = Math.ceil(
    (blockedUntil.getTime() - now.getTime()) / (1000 * 60),
  );

  return {
    isBlocked: true,
    blockedUntil,
    remainingMinutes,
  };
}

/**
 * Ban süresini sıfırlar (test amaçlı)
 */
export async function unblockUser(userId: string): Promise<void> {
  const { error } = await supabase
    .from("ai_blocks")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error unblocking user:", error);
    throw error;
  }
}
