/**
 * Create Listing API Route
 * İlan oluşturma
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * POST /api/ai/create-listing - İlan oluştur
 */

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, listingData } = body;

    if (!userId || !listingData) {
      return NextResponse.json(
        { error: "User ID and listing data required" },
        { status: 400 },
      );
    }

    // İlan verilerini hazırla
    const listing = {
      user_id: userId,
      description: listingData.description || "",
      date: listingData.date || "esnek",
      priority: listingData.priority || "normal",
      address: listingData.address || "belirtilmemiş",
      price_range: listingData.price_range || "belirtilmemiş",
      category: listingData.category || "genel",
      created_at: new Date().toISOString(),
      status: "open",
    };

    // Supabase'e yaz
    const { data, error } = await supabase
      .from("listings")
      .insert([listing])
      .select()
      .single();

    if (error) {
      console.error("Error creating listing:", error);
      return NextResponse.json(
        {
          error: "Failed to create listing",
          message: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      listing: data,
    });
  } catch (error: any) {
    console.error("Create listing error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message || "İlan oluşturulurken hata oluştu",
      },
      { status: 500 },
    );
  }
}
