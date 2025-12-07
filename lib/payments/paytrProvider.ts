/**
 * PayTR Payment Provider Implementation
 */

import crypto from "crypto";
import {
  PaymentProviderInterface,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentCallbackData,
} from "./types";

export class PayTRProvider implements PaymentProviderInterface {
  private merchantId: string;
  private merchantKey: string;
  private merchantSalt: string;

  constructor() {
    this.merchantId = process.env.PAYTR_MERCHANT_ID || "";
    this.merchantKey = process.env.PAYTR_MERCHANT_KEY || "";
    this.merchantSalt = process.env.PAYTR_MERCHANT_SALT || "";

    if (!this.merchantId || !this.merchantKey || !this.merchantSalt) {
      console.warn("PayTR credentials not configured");
    }
  }

  async initPayment(request: PaymentInitRequest): Promise<PaymentInitResponse> {
    try {
      const amountInKurus = Math.round(request.amount * 100); // TL'den kuruşa çevir

      // PayTR API'ye gönderilecek veriler
      const paymentData = {
        merchant_id: this.merchantId,
        merchant_key: this.merchantKey,
        merchant_salt: this.merchantSalt,
        email: request.customerEmail,
        payment_amount: amountInKurus,
        merchant_oid: request.orderId,
        user_name: request.customerName,
        user_address: "",
        user_phone: request.customerPhone || "",
        user_basket: Buffer.from(
          JSON.stringify([request.description || "Sipariş"]),
        ).toString("base64"),
        merchant_ok_url: request.returnUrl,
        merchant_fail_url: request.cancelUrl || request.returnUrl,
        timeout_limit: 30,
        currency: request.currency || "TL",
        test_mode: process.env.PAYTR_TEST_MODE === "true" ? "1" : "0",
      };

      // Hash hesaplama
      const hashString = `${this.merchantId}${this.merchantSalt}${paymentData.merchant_oid}${amountInKurus}${paymentData.email}`;
      const hash = crypto
        .createHmac("sha256", this.merchantKey)
        .update(hashString)
        .digest("base64");

      // PayTR API'ye istek gönder
      const response = await fetch(
        "https://www.paytr.com/odeme/api/get-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            ...paymentData,
            hash,
          } as any),
        },
      );

      const result = await response.text();

      if (result.startsWith("FAIL")) {
        return {
          success: false,
          error: result,
          provider: "paytr",
        };
      }

      // Başarılı ise token döner
      const token = result.trim();
      const paymentUrl = `https://www.paytr.com/odeme/guvenli/${token}`;

      return {
        success: true,
        paymentUrl,
        paymentId: request.orderId,
        provider: "paytr",
        metadata: {
          token,
        },
      };
    } catch (error: any) {
      console.error("PayTR init payment error:", error);
      return {
        success: false,
        error: error.message || "Payment initialization failed",
        provider: "paytr",
      };
    }
  }

  async verifyCallback(data: any): Promise<PaymentCallbackData> {
    const merchantOid = data.merchant_oid;
    const status = data.status;
    const paymentAmount = data.payment_amount;
    const hash = data.hash;
    const failedReasonCode = data.failed_reason_code;
    const failedReasonMessage = data.failed_reason_msg;

    // Hash doğrulama
    const hashString = `${this.merchantId}${this.merchantSalt}${merchantOid}${status}${paymentAmount}`;
    const calculatedHash = crypto
      .createHmac("sha256", this.merchantKey)
      .update(hashString)
      .digest("base64");

    if (calculatedHash !== hash) {
      throw new Error("Invalid hash");
    }

    const amountInTL = parseFloat(paymentAmount) / 100;

    return {
      orderId: merchantOid,
      status: status === "success" ? "success" : "failed",
      amount: amountInTL,
      transactionId: data.transaction_id,
      provider: "paytr",
      metadata: {
        failedReasonCode,
        failedReasonMessage,
      },
      errorCode: status !== "success" ? failedReasonCode : undefined,
      errorMessage: status !== "success" ? failedReasonMessage : undefined,
    };
  }

  async checkStatus(paymentId: string): Promise<PaymentCallbackData> {
    // PayTR doesn't have a direct status check API
    // This would need to be implemented via database lookup
    throw new Error("Status check not implemented for PayTR");
  }

  async refund(
    transactionId: string,
    amount: number,
  ): Promise<{ success: boolean; error?: string }> {
    // PayTR refund implementation would go here
    throw new Error("Refund not implemented for PayTR");
  }
}
