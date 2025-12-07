/**
 * iyzico Payment Provider Implementation
 * iyzico is one of Turkey's leading payment providers
 */

import {
  PaymentProviderInterface,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentCallbackData,
} from "./types";

export class IyzicoProvider implements PaymentProviderInterface {
  private apiKey: string;
  private secretKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.IYZICO_API_KEY || "";
    this.secretKey = process.env.IYZICO_SECRET_KEY || "";
    // iyzico sandbox URL for testing, production URL for live
    this.baseUrl =
      process.env.IYZICO_TEST_MODE === "true"
        ? "https://sandbox-api.iyzipay.com"
        : "https://api.iyzipay.com";

    if (!this.apiKey || !this.secretKey) {
      console.warn("iyzico credentials not configured");
    }
  }

  async initPayment(request: PaymentInitRequest): Promise<PaymentInitResponse> {
    try {
      // iyzico requires price to be in kuruş (cents)
      const price = Math.round(request.amount * 100);

      // Create payment request
      const paymentRequest = {
        locale: "tr",
        conversationId: request.orderId,
        price: price.toString(),
        paidPrice: price.toString(),
        currency: request.currency || "TRY",
        basketId: request.orderId,
        paymentChannel: "WEB",
        paymentGroup: "PRODUCT",
        callbackUrl: request.returnUrl,
        enabledInstallments: [2, 3, 6, 9],
        buyer: {
          id: request.customerId,
          name: request.customerName,
          surname: request.customerName.split(" ")[0] || request.customerName,
          gsmNumber: request.customerPhone || "",
          email: request.customerEmail,
          identityNumber: "", // Optional
          lastLoginDate: new Date().toISOString(),
          registrationDate: new Date().toISOString(),
          registrationAddress: "",
          ip: "127.0.0.1", // Should be actual client IP
          city: "",
          country: "Turkey",
          zipCode: "",
        },
        shippingAddress: {
          contactName: request.customerName,
          city: "",
          country: "Turkey",
          address: "",
          zipCode: "",
        },
        billingAddress: {
          contactName: request.customerName,
          city: "",
          country: "Turkey",
          address: "",
          zipCode: "",
        },
        basketItems: [
          {
            id: request.orderId,
            name: request.description || "Sipariş",
            category1: "Hizmet",
            itemType: "VIRTUAL",
            price: price.toString(),
          },
        ],
      };

      // Create authorization header
      const authorization = this.generateAuthorization(
        paymentRequest,
        "POST",
        "/payment/iyzipos/checkoutform/initialize/auth",
      );

      // Make request to iyzico
      const response = await fetch(
        `${this.baseUrl}/payment/iyzipos/checkoutform/initialize/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify(paymentRequest),
        },
      );

      const result = await response.json();

      if (result.status !== "success") {
        return {
          success: false,
          error: result.errorMessage || "Payment initialization failed",
          provider: "iyzico",
          metadata: result,
        };
      }

      // iyzico returns a checkout form content that needs to be rendered
      return {
        success: true,
        paymentUrl: result.checkoutFormContent
          ? undefined
          : result.paymentPageUrl,
        paymentId: result.conversationId,
        provider: "iyzico",
        metadata: {
          checkoutFormContent: result.checkoutFormContent,
          token: result.token,
          paymentPageUrl: result.paymentPageUrl,
        },
      };
    } catch (error: any) {
      console.error("iyzico init payment error:", error);
      return {
        success: false,
        error: error.message || "Payment initialization failed",
        provider: "iyzico",
      };
    }
  }

  async verifyCallback(data: any): Promise<PaymentCallbackData> {
    try {
      const token = data.token || data.iyziToken;
      if (!token) {
        throw new Error("Token is required");
      }

      // Retrieve payment result from iyzico
      const retrieveRequest = {
        locale: "tr",
        token: token,
      };

      const authorization = this.generateAuthorization(
        retrieveRequest,
        "POST",
        "/payment/iyzipos/checkoutform/auth/ecom/detail",
      );

      const response = await fetch(
        `${this.baseUrl}/payment/iyzipos/checkoutform/auth/ecom/detail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify(retrieveRequest),
        },
      );

      const result = await response.json();

      if (result.status !== "success") {
        throw new Error(result.errorMessage || "Payment verification failed");
      }

      const amount = parseFloat(result.paidPrice) / 100; // Convert from kuruş to TL

      return {
        orderId: result.conversationId || result.basketId,
        status: result.paymentStatus === "SUCCESS" ? "success" : "failed",
        amount: amount,
        transactionId: result.paymentId,
        provider: "iyzico",
        metadata: result,
        errorMessage:
          result.paymentStatus !== "SUCCESS" ? result.errorMessage : undefined,
      };
    } catch (error: any) {
      console.error("iyzico verify callback error:", error);
      throw error;
    }
  }

  async checkStatus(paymentId: string): Promise<PaymentCallbackData> {
    // iyzico status check would require the token, which we need to store
    throw new Error("Status check requires token, use verifyCallback instead");
  }

  async refund(
    transactionId: string,
    amount: number,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const refundAmount = Math.round(amount * 100); // Convert to kuruş

      const refundRequest = {
        locale: "tr",
        conversationId: transactionId,
        paymentTransactionId: transactionId,
        price: refundAmount.toString(),
        currency: "TRY",
        ip: "127.0.0.1",
      };

      const authorization = this.generateAuthorization(
        refundRequest,
        "POST",
        "/payment/refund",
      );

      const response = await fetch(`${this.baseUrl}/payment/refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: JSON.stringify(refundRequest),
      });

      const result = await response.json();

      if (result.status !== "success") {
        return {
          success: false,
          error: result.errorMessage || "Refund failed",
        };
      }

      return {
        success: true,
      };
    } catch (error: any) {
      console.error("iyzico refund error:", error);
      return {
        success: false,
        error: error.message || "Refund failed",
      };
    }
  }

  /**
   * Generate iyzico authorization header
   */
  private generateAuthorization(
    data: any,
    method: string,
    path: string,
  ): string {
    // iyzico uses a specific authorization format
    // This is a simplified version - full implementation would use iyzico SDK
    const randomString = this.generateRandomString(8);
    const requestString = JSON.stringify(data);
    const hashString = `${this.apiKey}${randomString}${this.secretKey}${requestString}`;

    // In a real implementation, you'd use the iyzico SDK or crypto library
    // For now, this is a placeholder - should use iyzico's official SDK
    const hash = this.sha256(hashString);
    const authorization = `IYZWS ${this.apiKey}:${hash}`;

    return authorization;
  }

  private generateRandomString(length: number): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private sha256(message: string): string {
    // This should use Node.js crypto module or iyzico SDK
    // Simplified for now - needs proper implementation
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(message).digest("hex");
  }
}
