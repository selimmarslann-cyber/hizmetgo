import { prisma } from "@/lib/db/prisma";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";

/**
 * Supabase Auth kullanarak kullanıcı oluşturma
 */

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  instantJobNotifications?: boolean;
  whatsappNotifications?: boolean;
  smsNotifications?: boolean;
  emailMarketing?: boolean;
  skillCategories?: string[];
  publishWithoutKeyword?: boolean;
}) {
  // 1. Supabase Auth'da kullanıcı oluştur
  const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });

  if (authError) {
    throw new Error(`Supabase auth error: ${authError.message}`);
  }

  if (!authData.user) {
    throw new Error("Kullanıcı oluşturulamadı");
  }

  // 2. Prisma'da user kaydı oluştur (passwordHash null - Supabase'de tutuluyor)
  return prisma.user.create({
    data: {
      id: authData.user.id, // Supabase user ID'yi kullan
      email: data.email,
      passwordHash: null, // Supabase'de tutuluyor
      name: data.name,
      instantJobNotifications: data.instantJobNotifications ?? false,
      whatsappNotifications: data.whatsappNotifications ?? false,
      smsNotifications: data.smsNotifications ?? false,
      emailMarketing: data.emailMarketing ?? false,
      skillCategories: data.skillCategories || [],
      // TS2353 fix: publishWithoutKeyword field does not exist in User model
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function verifyUser(email: string, password: string) {
  // Supabase Auth ile doğrulama
  const { data: authData, error: authError } =
    await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

  if (authError || !authData.user) {
    return null;
  }

  // Prisma'dan user bilgilerini al
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }

  return user;
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
