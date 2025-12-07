import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { sendMail } from "@/lib/mail";
import { buildPaymentReceivedEmail } from "@/lib/mailTemplates";
import crypto from "crypto";
import { PaymentStatus } from "@prisma/client";

/**
 * PayTR Callback Endpoint
 *
 * PayTR'dan gelen callback'i alır, hash doğrulaması yapar ve
 * ödeme başarılı ise siparişi "paid" durumuna çeker.
 *
 * PayTR dokümantasyonuna göre:
 * - merchant_oid: Sipariş ID (bizde orderId)
 * - status: "success" veya "failed"
 * - payment_amount: Ödeme tutarı (kuruş bazlı, örn: 12345 = 123.45 TL)
 * - hash: PayTR tarafından gönderilen hash (doğrulama için)
 */

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    // PayTR'dan gelen form data'yı al
    const formData = await request.formData();
    const merchantOid = formData.get("merchant_oid") as string;
    const status = formData.get("status") as string;
    const paymentAmount = formData.get("payment_amount") as string;
    const hash = formData.get("hash") as string;
    const failedReasonCode = formData.get("failed_reason_code") as
      | string
      | null;
    const failedReasonMessage = formData.get("failed_reason_msg") as
      | string
      | null;

    if (!merchantOid || !status || !paymentAmount) {
      console.error("PayTR callback: Eksik parametreler", {
        merchantOid,
        status,
        paymentAmount,
      });
      return new NextResponse("ERROR: Missing parameters", { status: 400 });
    }

    // Order'ı bul (merchant_oid = orderId)
    const order = await prisma.order.findUnique({
      where: { id: merchantOid },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        payment: true,
      },
    });

    if (!order) {
      console.error("PayTR callback: Sipariş bulunamadı", { merchantOid });
      return new NextResponse("ERROR: Order not found", { status: 404 });
    }

    // Hash doğrulaması
    const merchantId = process.env.PAYTR_MERCHANT_ID;
    const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
    const merchantKey = process.env.PAYTR_MERCHANT_KEY;

    if (!merchantId || !merchantSalt || !merchantKey) {
      console.error("PayTR callback: PayTR konfigürasyonu eksik");
      return new NextResponse("ERROR: Configuration missing", { status: 500 });
    }

    // PayTR hash hesaplama (PayTR dokümantasyonuna göre)
    const hashString = `${merchantId}${merchantSalt}${merchantOid}${status}${paymentAmount}`;
    const calculatedHash = crypto
      .createHmac("sha256", merchantKey)
      .update(hashString)
      .digest("base64");

    // Hash karşılaştırması
    if (calculatedHash !== hash) {
      console.error("PayTR callback: Hash doğrulaması başarısız", {
        merchantOid,
        calculatedHash,
        receivedHash: hash,
      });
      return new NextResponse("ERROR: Invalid hash", { status: 400 });
    }

    // Ödeme tutarını TL'ye çevir (kuruş bazlı: 12345 = 123.45 TL)
    const amountInTL = parseFloat(paymentAmount) / 100;
    const orderAmount = parseFloat(order.totalAmount.toString());

    // Tutar kontrolü (küçük bir tolerans ile - PayTR'ın yuvarlama farkları için)
    if (Math.abs(amountInTL - orderAmount) > 0.01) {
      console.error("PayTR callback: Tutar uyuşmazlığı", {
        merchantOid,
        expected: orderAmount,
        received: amountInTL,
      });
      return new NextResponse("ERROR: Amount mismatch", { status: 400 });
    }

    // Ödeme başarılı ise
    if (status === "success") {
      await prisma.$transaction(async (tx) => {
        // Order payment status'u güncelle
        await tx.order.update({
          where: { id: merchantOid },
          data: {
            paymentStatus: PaymentStatus.CAPTURED,
          },
        });

        // Payment kaydını güncelle
        if (order.payment) {
          await tx.payment.update({
            where: { id: order.payment.id },
            data: {
              status: PaymentStatus.CAPTURED,
              provider: "paytr",
              externalId: merchantOid, // PayTR transaction ID varsa buraya eklenebilir
              rawResponse: {
                merchant_oid: merchantOid,
                status,
                payment_amount: paymentAmount,
                hash,
              } as any,
            },
          });
        }
      });

      // Ödeme alındı maili gönder
      try {
        const { subject, html } = buildPaymentReceivedEmail({
          customerName: order.customer.name,
          orderId: order.id,
          amount: amountInTL,
          currency: "TRY",
          paymentMethod: "PayTR",
        });

        await sendMail(order.customer.email, subject, html);
        console.log("PayTR callback: Ödeme alındı maili gönderildi", {
          orderId: merchantOid,
        });
      } catch (mailError) {
        // Mail hatası sipariş akışını etkilemesin, sadece log'a yaz
        console.error("PayTR callback: Mail gönderme hatası", mailError);
      }

      // PayTR'ın beklediği response
      return new NextResponse("OK", { status: 200 });
    } else {
      // Ödeme başarısız
      console.error("PayTR callback: Ödeme başarısız", {
        merchantOid,
        status,
        failedReasonCode,
        failedReasonMessage,
      });

      await prisma.$transaction(async (tx) => {
        // Order payment status'u güncelle
        await tx.order.update({
          where: { id: merchantOid },
          data: {
            paymentStatus: PaymentStatus.FAILED,
          },
        });

        // Payment kaydını güncelle
        if (order.payment) {
          await tx.payment.update({
            where: { id: order.payment.id },
            data: {
              status: PaymentStatus.FAILED,
              rawResponse: {
                merchant_oid: merchantOid,
                status,
                payment_amount: paymentAmount,
                failed_reason_code: failedReasonCode,
                failed_reason_msg: failedReasonMessage,
              } as any,
            },
          });
        }
      });

      // PayTR'ın beklediği response (başarısız olsa bile OK dönmeliyiz)
      return new NextResponse("OK", { status: 200 });
    }
  } catch (error: any) {
    console.error("PayTR callback: Genel hata", error);
    return new NextResponse(`ERROR: ${error.message}`, { status: 500 });
  }
}
