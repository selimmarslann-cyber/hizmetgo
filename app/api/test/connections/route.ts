/**
 * Connection Test Endpoint
 * Tests all critical connections without modifying .env
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { supabase } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getTransporter } from "@/lib/mail";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface TestResult {
  name: string;
  status: "success" | "error";
  message: string;
  details?: any;
}

export async function GET(request: NextRequest) {
  const results: TestResult[] = [];

  // 1. Database Connection Test (Prisma)
  try {
    await prisma.$queryRaw`SELECT 1`;
    results.push({
      name: "Database (Prisma)",
      status: "success",
      message: "Database connection successful",
    });
  } catch (error: any) {
    results.push({
      name: "Database (Prisma)",
      status: "error",
      message: error.message || "Database connection failed",
      details: {
        error: error.toString(),
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlPrefix:
          process.env.DATABASE_URL?.substring(0, 20) || "NOT_SET",
      },
    });
  }

  // 2. Supabase Client Connection Test
  try {
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);
    if (error && error.code !== "PGRST116") {
      // PGRST116 = table not found (expected in some cases)
      throw error;
    }
    results.push({
      name: "Supabase Client (Anon Key)",
      status: "success",
      message: "Supabase client connection successful",
      details: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    });
  } catch (error: any) {
    results.push({
      name: "Supabase Client (Anon Key)",
      status: "error",
      message: error.message || "Supabase client connection failed",
      details: {
        error: error.toString(),
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    });
  }

  // 3. Supabase Admin Connection Test
  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("count")
      .limit(1);
    if (error && error.code !== "PGRST116") {
      throw error;
    }
    results.push({
      name: "Supabase Admin (Service Role)",
      status: "success",
      message: "Supabase admin connection successful",
      details: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });
  } catch (error: any) {
    results.push({
      name: "Supabase Admin (Service Role)",
      status: "error",
      message: error.message || "Supabase admin connection failed",
      details: {
        error: error.toString(),
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });
  }

  // 4. Email SMTP Connection Test
  try {
    if (
      !process.env.MAIL_HOST ||
      !process.env.MAIL_USER ||
      !process.env.MAIL_PASS
    ) {
      throw new Error("Email configuration missing");
    }
    const transporter = getTransporter();
    await transporter.verify();
    results.push({
      name: "Email SMTP",
      status: "success",
      message: "SMTP connection successful",
      details: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USER?.substring(0, 10) + "...",
      },
    });
  } catch (error: any) {
    results.push({
      name: "Email SMTP",
      status: "error",
      message: error.message || "SMTP connection failed",
      details: {
        error: error.toString(),
        hasHost: !!process.env.MAIL_HOST,
        hasPort: !!process.env.MAIL_PORT,
        hasUser: !!process.env.MAIL_USER,
        hasPass: !!process.env.MAIL_PASS,
      },
    });
  }

  // 5. OpenAI API Test
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not set");
    }
    const OpenAI = require("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY.trim() });
    await client.models.list();
    results.push({
      name: "OpenAI API",
      status: "success",
      message: "OpenAI API connection successful",
      details: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + "...",
      },
    });
  } catch (error: any) {
    results.push({
      name: "OpenAI API",
      status: "error",
      message: error.message || "OpenAI API connection failed",
      details: {
        error: error.toString(),
        hasApiKey: !!process.env.OPENAI_API_KEY,
      },
    });
  }

  // 6. JWT Secrets Check
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }
    if (!process.env.MOBILE_JWT_SECRET) {
      throw new Error("MOBILE_JWT_SECRET not set");
    }
    if (process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET should be at least 32 characters");
    }
    if (process.env.MOBILE_JWT_SECRET.length < 32) {
      throw new Error("MOBILE_JWT_SECRET should be at least 32 characters");
    }
    results.push({
      name: "JWT Secrets",
      status: "success",
      message: "JWT secrets configured correctly",
      details: {
        jwtSecretLength: process.env.JWT_SECRET.length,
        mobileJwtSecretLength: process.env.MOBILE_JWT_SECRET.length,
      },
    });
  } catch (error: any) {
    results.push({
      name: "JWT Secrets",
      status: "error",
      message: error.message || "JWT secrets check failed",
      details: {
        error: error.toString(),
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasMobileJwtSecret: !!process.env.MOBILE_JWT_SECRET,
        jwtSecretLength: process.env.JWT_SECRET?.length || 0,
        mobileJwtSecretLength: process.env.MOBILE_JWT_SECRET?.length || 0,
      },
    });
  }

  // 7. App URL Check
  try {
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      throw new Error("NEXT_PUBLIC_APP_URL not set");
    }
    results.push({
      name: "App URL",
      status: "success",
      message: "App URL configured",
      details: {
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
      },
    });
  } catch (error: any) {
    results.push({
      name: "App URL",
      status: "error",
      message: error.message || "App URL check failed",
      details: {
        hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      },
    });
  }

  // 8. Admin Credentials Check
  try {
    if (!process.env.ADMIN_USERNAME) {
      throw new Error("ADMIN_USERNAME not set");
    }
    if (!process.env.ADMIN_PASSWORD) {
      throw new Error("ADMIN_PASSWORD not set");
    }
    if (!process.env.ADMIN_EMAIL) {
      throw new Error("ADMIN_EMAIL not set");
    }
    results.push({
      name: "Admin Credentials",
      status: "success",
      message: "Admin credentials configured",
      details: {
        hasUsername: !!process.env.ADMIN_USERNAME,
        hasPassword: !!process.env.ADMIN_PASSWORD,
        hasEmail: !!process.env.ADMIN_EMAIL,
        email: process.env.ADMIN_EMAIL,
      },
    });
  } catch (error: any) {
    results.push({
      name: "Admin Credentials",
      status: "error",
      message: error.message || "Admin credentials check failed",
      details: {
        error: error.toString(),
        hasUsername: !!process.env.ADMIN_USERNAME,
        hasPassword: !!process.env.ADMIN_PASSWORD,
        hasEmail: !!process.env.ADMIN_EMAIL,
      },
    });
  }

  // Summary
  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;
  const allSuccess = errorCount === 0;

  return NextResponse.json({
    success: allSuccess,
    summary: {
      total: results.length,
      success: successCount,
      errors: errorCount,
    },
    results,
    timestamp: new Date().toISOString(),
  });
}
