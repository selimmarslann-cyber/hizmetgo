/**
 * Test endpoint for send-code API
 * GET /api/test/send-code
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {},
    errors: [],
  };

  // 1. Check environment variables
  results.checks.env = {
    MAIL_USER: process.env.MAIL_USER ? "SET" : "NOT_SET",
    MAIL_PASS: process.env.MAIL_PASS ? "SET" : "NOT_SET",
    MAIL_HOST: process.env.MAIL_HOST ? "SET" : "NOT_SET",
    MAIL_PORT: process.env.MAIL_PORT ? "SET" : "NOT_SET",
    MAIL_SECURE: process.env.MAIL_SECURE ? "SET" : "NOT_SET",
    MAIL_FROM: process.env.MAIL_FROM ? "SET" : "NOT_SET",
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT_SET",
  };

  // 2. Test database connection
  try {
    await prisma.$connect();
    results.checks.database = "CONNECTED";

    // Test OTP table
    const otpCount = await prisma.otp.count();
    results.checks.otpTable = `EXISTS (${otpCount} records)`;
  } catch (error: any) {
    results.checks.database = "ERROR";
    results.errors.push({
      type: "database",
      message: error.message,
      code: error.code,
    });
  }

  // 3. Test email configuration
  try {
    const { getTransporter } = await import("@/lib/mail");
    const transporter = getTransporter();
    results.checks.emailConfig = "VALID";
  } catch (error: any) {
    results.checks.emailConfig = "ERROR";
    results.errors.push({
      type: "email_config",
      message: error.message,
    });
  }

  return NextResponse.json(results, { status: 200 });
}
