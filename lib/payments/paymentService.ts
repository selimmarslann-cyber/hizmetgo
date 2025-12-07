/**
 * Payment Service
 * Unified payment service that supports multiple providers
 */

import {
  PaymentProviderInterface,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentCallbackData,
  PaymentProvider,
} from "./types";
import { PayTRProvider } from "./paytrProvider";
import { IyzicoProvider } from "./iyzicoProvider";

export class PaymentService {
  private providers: Map<PaymentProvider, PaymentProviderInterface> = new Map();

  constructor() {
    // Initialize providers
    this.providers.set("paytr", new PayTRProvider());
    this.providers.set("iyzico", new IyzicoProvider());
  }

  /**
   * Get a payment provider
   */
  getProvider(provider: PaymentProvider): PaymentProviderInterface {
    const providerInstance = this.providers.get(provider);
    if (!providerInstance) {
      throw new Error(`Payment provider ${provider} not found`);
    }
    return providerInstance;
  }

  /**
   * Initialize payment with preferred provider
   */
  async initPayment(
    request: PaymentInitRequest,
    preferredProvider?: PaymentProvider,
  ): Promise<PaymentInitResponse> {
    // Determine provider (preferred or default)
    const provider = preferredProvider || this.getDefaultProvider();

    try {
      const providerInstance = this.getProvider(provider);
      return await providerInstance.initPayment(request);
    } catch (error: any) {
      console.error(`Payment init failed with ${provider}:`, error);

      // Fallback to another provider if available
      if (provider !== "paytr") {
        try {
          const fallbackProvider = this.getProvider("paytr");
          return await fallbackProvider.initPayment(request);
        } catch (fallbackError: any) {
          console.error("Fallback provider also failed:", fallbackError);
        }
      }

      return {
        success: false,
        error: error.message || "Payment initialization failed",
        provider,
      };
    }
  }

  /**
   * Verify callback from payment provider
   */
  async verifyCallback(
    provider: PaymentProvider,
    data: any,
  ): Promise<PaymentCallbackData> {
    const providerInstance = this.getProvider(provider);
    return await providerInstance.verifyCallback(data);
  }

  /**
   * Get default payment provider
   */
  private getDefaultProvider(): PaymentProvider {
    // Return default provider based on env or config
    return (process.env.DEFAULT_PAYMENT_PROVIDER as PaymentProvider) || "paytr";
  }

  /**
   * Get available payment providers
   */
  getAvailableProviders(): PaymentProvider[] {
    return Array.from(this.providers.keys());
  }
}

// Singleton instance
export const paymentService = new PaymentService();
