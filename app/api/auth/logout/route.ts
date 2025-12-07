import { NextResponse } from "next/server";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Cookie'yi sil
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
