/**
 * Analytics Types
 * Comprehensive analytics data structures
 */

export interface RevenueMetrics {
  today: number;
  thisWeek: number;
  thisMonth: number;
  lastMonth: number;
  trend: number; // percentage change
  total: number;
}

export interface OrderMetrics {
  today: number;
  thisWeek: number;
  thisMonth: number;
  lastMonth: number;
  trend: number;
  total: number;
  completed: number;
  cancelled: number;
  pending: number;
}

export interface CustomerMetrics {
  total: number;
  new: number;
  returning: number;
  averageOrderValue: number;
  lifetimeValue: number;
}

export interface RatingMetrics {
  average: number;
  count: number;
  trend: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface TimeSeriesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface ProductPerformance {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  trend: number;
  averageRating: number;
}

export interface AnalyticsDashboardData {
  revenue: RevenueMetrics;
  orders: OrderMetrics;
  customers: CustomerMetrics;
  ratings: RatingMetrics;
  topProducts: ProductPerformance[];
  timeSeries: TimeSeriesData[];
  // Additional metrics
  conversionRate: number;
  averageResponseTime: number;
  completionRate: number;
  refundRate: number;
}
