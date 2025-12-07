/**
 * Domain Types - Hizmetgo
 *
 * Bu dosya, API response'larında dönen ve frontend'de kullanılan
 * temel domain tiplerini içerir.
 *
 * NOT: Prisma modellerinden türetilmiş, ancak frontend için gereksiz
 * alanlar (password, internal id'ler) çıkarılmıştır.
 */

// ============================================
// USER
// ============================================
export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string | null;
  city?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// BUSINESS
// ============================================
export type BusinessCategory =
  | "TESISAT"
  | "KUAFOR"
  | "MARKET"
  | "NAKLIYE"
  | "TEMIZLIK"
  | "ELEKTRIK"
  | "BOYA"
  | "MARANGOZ"
  | "DIGER";

export type OnlineStatus = "ONLINE" | "OFFLINE" | "AUTO_OFFLINE";

export interface Business {
  id: string;
  ownerUserId: string;
  name: string;
  description?: string | null;
  category: BusinessCategory;
  lat: number;
  lng: number;
  addressText: string;
  coverImageUrl?: string | null;
  isActive: boolean;
  onlineStatus: OnlineStatus;
  avgRating: number;
  reviewCount: number;
  mainCategories: string[];
  subServices: string[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// JOB (İş Talebi)
// ============================================
export type JobStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Job {
  id: string;
  customerId: string;
  mainCategoryId: string;
  subServiceId?: string | null;
  isOther: boolean;
  description: string;
  city: string;
  district: string;
  addressText?: string | null;
  locationLat?: number | null;
  locationLng?: number | null;
  scheduledAt?: string | null;
  status: JobStatus;
  acceptedByBusinessId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// ORDER
// ============================================
export type OrderStatus =
  | "PENDING_CONFIRMATION"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED_BY_CUSTOMER"
  | "CANCELLED_BY_PROVIDER";

export type PaymentStatus =
  | "INITIATED"
  | "AUTHORIZED"
  | "CAPTURED"
  | "REFUNDED"
  | "FAILED";

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  businessId: string;
  totalAmount: number;
  vendorAmount: number; // Vendor'ın alacağı pay
  commissionFee: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  addressText: string;
  locationLat?: number | null;
  locationLng?: number | null;
  scheduledAt?: string | null;
  completedAt?: string | null; // FAZ 3: İş tamamlanma zamanı
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// REFERRAL
// ============================================
export interface ReferralCode {
  code: string;
  referralLink: string;
}

export interface ReferralOverview {
  currentReferralCode: string;
  referralLink: string;
  totalReferralEarnings: number;
  totalRegionEarnings: number;
  totalEarnings: number;
  monthlyReferralEarnings: number;
  monthlyRegionEarnings: number;
  monthlyEarnings: number;
  level1Count: number;
  level2Count: number;
  level3Count: number;
  level4Count: number;
  level5Count: number;
  level1Earnings: number;
  level2Earnings: number;
  level3Earnings: number;
  level4Earnings: number;
  level5Earnings: number;
  currentBalance: number;
  currentRank: number;
  currentGMV: number;
  nextRankThreshold: number;
  nextRankName: string;
  remainingForNext: number;
}

export interface ReferralStats {
  totalEarnings: number;
  monthlyEarnings: number;
  level1Earnings: number;
  level2Earnings: number;
  currentBalance: number;
}

export interface ReferralReward {
  id: string;
  userId: string;
  orderId: string;
  level: number;
  grossCommission: number;
  shareRate: number;
  amount: number;
  order: {
    id: string;
    totalAmount: number;
    createdAt: string;
  };
  createdAt: string;
}

export interface ReferralRewardsResponse {
  rewards: ReferralReward[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// PAYMENT (FAZ 3: Genişletildi)
// ============================================
export interface Payment {
  id: string;
  orderId: string;
  customerId: string;
  vendorId: string;
  amount: number;
  platformFee: number;
  vendorShare: number;
  status: PaymentStatus;
  provider: string;
  externalId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// WALLET (FAZ 3)
// ============================================
export interface Wallet {
  id: string;
  userId: string;
  balance: number; // Çekilebilir bakiye
  pendingBalance: number; // Onay bekleyen
  currency: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// PAYOUT_REQUEST (FAZ 3)
// ============================================
export type PayoutStatus = "PENDING" | "APPROVED" | "REJECTED" | "PAID";

export interface PayoutRequest {
  id: string;
  walletId: string;
  userId: string;
  amount: number;
  status: PayoutStatus;
  iban?: string | null;
  notes?: string | null;
  requestedAt: string;
  processedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// REVIEW (FAZ 3: Zaten var ama kontrol edelim)
// ============================================
export interface Review {
  id: string;
  orderId: string;
  businessId: string;
  reviewerId: string;
  rating: number; // 1-5
  comment?: string | null;
  createdAt: string;
}

// ============================================
// NOTIFICATION (FAZ 3)
// ============================================
export type NotificationType =
  | "JOB_CREATED"
  | "OFFER_RECEIVED"
  | "ORDER_ACCEPTED"
  | "ORDER_COMPLETED"
  | "ORDER_CANCELLED"
  | "REVIEW_RECEIVED"
  | "REFERRAL_REWARD"
  | "PAYOUT_APPROVED"
  | "PAYOUT_REJECTED"
  | "PAYOUT_PAID"
  | "GENERAL";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: any; // Json data
  isRead: boolean;
  createdAt: string;
}
