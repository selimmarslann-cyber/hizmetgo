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
  // Önce Supabase Auth ile giriş yapmayı dene
  const { data: authData, error: authError } =
    await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

  // Eğer Supabase'de giriş başarısız olursa
  if (authError || !authData.user) {
    // Prisma'da kullanıcıyı kontrol et
    const user = await getUserByEmail(email);
    
    // Eğer Prisma'da kullanıcı varsa ama Supabase'de yoksa, Supabase'de oluştur
    if (user && (authError?.message?.includes("Invalid login credentials") || authError?.message?.includes("User not found"))) {
      // Önce Prisma'da password hash varsa bcrypt ile kontrol et (hızlı fallback)
      if (user.passwordHash) {
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (isValid) {
          // Şifre doğru, Supabase'de oluşturmayı dene ama başarısız olursa da kullanıcıyı döndür
          try {
            const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
              email: user.email,
              password: password,
              email_confirm: true,
              user_metadata: { name: user.name },
            });
            
            if (!createError && createData.user && user.id !== createData.user.id) {
              // Supabase'de oluşturuldu, ID'yi güncelle
              await prisma.user.update({
                where: { id: user.id },
                data: { id: createData.user.id },
              });
              user.id = createData.user.id;
            }
          } catch (supabaseError) {
            // Supabase hatası önemli değil, Prisma'da şifre doğru olduğu için kullanıcıyı döndür
            console.warn("Supabase user creation failed, but password is valid in Prisma:", supabaseError);
          }
          return user;
        }
      }
      
      // Prisma'da şifre yoksa veya yanlışsa, Supabase'de oluşturmayı dene
      try {
        const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: password,
          email_confirm: true,
          user_metadata: { name: user.name },
        });
        
        if (createError) {
          // Eğer kullanıcı zaten varsa, tekrar giriş yapmayı dene
          if (createError.message?.includes("already registered") || createError.message?.includes("already exists")) {
            const { data: retryAuthData, error: retryAuthError } = await supabaseAdmin.auth.signInWithPassword({
              email,
              password,
            });
            if (!retryAuthError && retryAuthData.user) {
              return user;
            }
          }
          return null;
        }
        
        if (!createData.user) {
          return null;
        }
        
        // Supabase'de oluşturuldu, Prisma'da user ID'yi güncelle
        if (user.id !== createData.user.id) {
          await prisma.user.update({
            where: { id: user.id },
            data: { id: createData.user.id },
          });
          user.id = createData.user.id;
        }
        
        return user;
      } catch (createError: any) {
        console.error("Error creating Supabase user:", createError.message);
        return null;
      }
    }
    
    // Giriş başarısız ve kullanıcı Prisma'da da yok
    // Eğer Prisma'da kullanıcı varsa ama şifre yanlışsa, bcrypt ile kontrol et
    if (user && user.passwordHash) {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (isValid) {
        return user;
      }
    }
    
    return null;
  }

  // Supabase'de giriş başarılı, Prisma'dan user bilgilerini al
  let user = await getUserByEmail(email);
  
  if (!user) {
    // Prisma'da kullanıcı yok, Supabase'de var - Prisma'da oluştur
    try {
      user = await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email || email,
          name: authData.user.user_metadata?.name || email.split("@")[0],
          passwordHash: null, // Supabase'de tutuluyor
        },
      });
    } catch (createError: any) {
      console.error("Error creating Prisma user:", createError);
      // Kullanıcı oluşturulamadı, null döndür
      return null;
    }
  }

  return user;
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
