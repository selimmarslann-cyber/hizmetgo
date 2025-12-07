/**
 * Payment Provider Types
 * Unified interface for different payment providers
 */

export type PaymentProvider = "paytr" | "iyzico" | "stripe" | "mock";

export interface PaymentInitRequest {
  orderId: string;
  amount: number; // TL cinsinden
  customerId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  returnUrl: string;
  cancelUrl?: string;
  description?: string;
  currency?: string; // Default: 'TRY'
}

export interface PaymentInitResponse {
  success: boolean;
  paymentUrl?: string;
  paymentId?: string;
  error?: string;
  provider: PaymentProvider;
  metadata?: Record<string, any>;
}

export interface PaymentCallbackData {
  orderId: string;
  status: "success" | "failed" | "pending";
  amount: number;
  transactionId?: string;
  provider: PaymentProvider;
  metadata?: Record<string, any>;
  errorCode?: string;
  errorMessage?: string;
}

export interface PaymentProviderInterface {
  /**
   * Initialize a payment
   */
  initPayment(request: PaymentInitRequest): Promise<PaymentInitResponse>;

  /**
   * Verify callback data
   */
  verifyCallback(data: any): Promise<PaymentCallbackData>;

  /**
   * Check payment status
   */
  checkStatus(paymentId: string): Promise<PaymentCallbackData>;

  /**
   * Refund a payment
   */
  refund(
    transactionId: string,
    amount: number,
  ): Promise<{ success: boolean; error?: string }>;
}
