import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { faqId, question, type } = body; // type: "helpful" | "not-helpful"

    if (!faqId || !type) {
      return NextResponse.json(
        { error: "faqId and type are required" },
        { status: 400 },
      );
    }

    // Feedback'i log olarak kaydet (ileride database'e eklenebilir)
    console.log("FAQ Feedback:", {
      faqId,
      question,
      type,
      userId: session?.userId || null,
      timestamp: new Date().toISOString(),
    });

    // İleride bir FAQFeedback modeli eklenebilir:
    // await prisma.fAQFeedback.create({
    //   data: {
    //     faqId,
    //     question,
    //     type,
    //     userId: session?.userId || null,
    //   },
    // });

    return NextResponse.json({
      success: true,
      message: "Feedback kaydedildi",
    });
  } catch (error: any) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      {
        error: "Failed to save feedback",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

