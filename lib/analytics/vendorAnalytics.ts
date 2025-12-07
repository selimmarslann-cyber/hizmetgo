/**
 * Vendor Analytics Service
 * Comprehensive analytics calculations for vendors
 */

import { prisma } from "@/lib/db/prisma";
import type { AnalyticsDashboardData } from "./types";

export async function getVendorAnalytics(
  businessId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<AnalyticsDashboardData> {
  const now = new Date();
  const defaultStartDate =
    startDate || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  const defaultEndDate = endDate || now;

  // Get business
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: {
      id: true,
      ownerUserId: true,
      avgRating: true,
      reviewCount: true,
    },
  });

  if (!business) {
    throw new Error("Business not found");
  }

  // Revenue calculations
  const completedOrders = await prisma.order.findMany({
    where: {
      businessId,
      status: "COMPLETED",
      completedAt: {
        gte: defaultStartDate,
        lte: defaultEndDate,
      },
    },
    select: {
      vendorAmount: true,
      totalAmount: true,
      completedAt: true,
      customerId: true,
    },
  });

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);

  const monthStart = new Date(now);
  monthStart.setMonth(monthStart.getMonth() - 1);

  const lastMonthStart = new Date(now);
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 2);

  const lastMonthEnd = new Date(now);
  lastMonthEnd.setMonth(lastMonthEnd.getMonth() - 1);

  // Today's revenue
  const todayRevenue = completedOrders
    .filter((o) => o.completedAt && o.completedAt >= todayStart)
    .reduce((sum, o) => sum + parseFloat(o.vendorAmount.toString()), 0);

  // This week's revenue
  const thisWeekRevenue = completedOrders
    .filter((o) => o.completedAt && o.completedAt >= weekStart)
    .reduce((sum, o) => sum + parseFloat(o.vendorAmount.toString()), 0);

  // This month's revenue
  const thisMonthRevenue = completedOrders
    .filter((o) => o.completedAt && o.completedAt >= monthStart)
    .reduce((sum, o) => sum + parseFloat(o.vendorAmount.toString()), 0);

  // Last month's revenue
  const lastMonthOrders = await prisma.order.findMany({
    where: {
      businessId,
      status: "COMPLETED",
      completedAt: {
        gte: lastMonthStart,
        lt: lastMonthEnd,
      },
    },
    select: {
      vendorAmount: true,
    },
  });

  const lastMonthRevenue = lastMonthOrders.reduce(
    (sum, o) => sum + parseFloat(o.vendorAmount.toString()),
    0,
  );

  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + parseFloat(o.vendorAmount.toString()),
    0,
  );

  const revenueTrend =
    lastMonthRevenue > 0
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 0;

  // Order metrics
  const allOrders = await prisma.order.findMany({
    where: {
      businessId,
      createdAt: {
        gte: defaultStartDate,
        lte: defaultEndDate,
      },
    },
    select: {
      status: true,
      createdAt: true,
      completedAt: true,
    },
  });

  const todayOrders = allOrders.filter((o) => o.createdAt >= todayStart).length;

  const thisWeekOrders = allOrders.filter(
    (o) => o.createdAt >= weekStart,
  ).length;

  const thisMonthOrders = allOrders.filter(
    (o) => o.createdAt >= monthStart,
  ).length;

  const lastMonthOrdersCount = await prisma.order.count({
    where: {
      businessId,
      status: "COMPLETED",
      completedAt: {
        gte: lastMonthStart,
        lt: lastMonthEnd,
      },
    },
  });

  const orderTrend =
    lastMonthOrdersCount > 0
      ? ((thisMonthOrders - lastMonthOrdersCount) / lastMonthOrdersCount) * 100
      : 0;

  const ordersCompleted = allOrders.filter(
    (o) => o.status === "COMPLETED",
  ).length;
  const ordersCancelled = allOrders.filter(
    (o) =>
      o.status === "CANCELLED_BY_CUSTOMER" ||
      o.status === "CANCELLED_BY_PROVIDER",
  ).length;
  const ordersPending = allOrders.filter(
    (o) =>
      o.status === "PENDING_CONFIRMATION" ||
      o.status === "ACCEPTED" ||
      o.status === "IN_PROGRESS",
  ).length;

  // Customer metrics
  const uniqueCustomers = new Set(completedOrders.map((o) => o.customerId));
  const newCustomers = await prisma.user.count({
    where: {
      id: { in: Array.from(uniqueCustomers) },
      createdAt: {
        gte: defaultStartDate,
        lte: defaultEndDate,
      },
    },
  });

  const averageOrderValue =
    completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  // Rating metrics
  const reviews = await prisma.review.findMany({
    where: {
      businessId,
      createdAt: {
        gte: defaultStartDate,
        lte: defaultEndDate,
      },
    },
    select: {
      rating: true,
      createdAt: true,
    },
  });

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  // Rating trend
  const recentReviews = reviews.filter(
    (r) =>
      new Date(r.createdAt) >=
      new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
  );
  const previousReviews = reviews.filter((r) => {
    const reviewDate = new Date(r.createdAt);
    return (
      reviewDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) &&
      reviewDate < new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000)
    );
  });

  const recentAvg =
    recentReviews.length > 0
      ? recentReviews.reduce((sum, r) => sum + r.rating, 0) /
        recentReviews.length
      : business.avgRating || 0;

  const previousAvg =
    previousReviews.length > 0
      ? previousReviews.reduce((sum, r) => sum + r.rating, 0) /
        previousReviews.length
      : business.avgRating || 0;

  const ratingTrend =
    previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0;

  // Top products
  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        businessId,
        status: "COMPLETED",
        completedAt: {
          gte: defaultStartDate,
          lte: defaultEndDate,
        },
      },
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const productStats = new Map<string, { sales: number; revenue: number }>();
  orderItems.forEach((item) => {
    if (!item.product) return;
    const existing = productStats.get(item.product.id) || {
      sales: 0,
      revenue: 0,
    };
    productStats.set(item.product.id, {
      sales: existing.sales + item.quantity,
      revenue: existing.revenue + parseFloat(item.totalPrice.toString()),
    });
  });

  const topProducts = Array.from(productStats.entries())
    .map(([id, stats]) => ({
      id,
      name:
        orderItems.find((item) => item.product?.id === id)?.product?.name ||
        "Bilinmeyen",
      sales: stats.sales,
      revenue: stats.revenue,
      trend: 0, // Can be calculated with previous period comparison
      averageRating: business.avgRating || 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Time series data (daily for the period)
  const timeSeries: Array<{
    date: string;
    revenue: number;
    orders: number;
    customers: number;
  }> = [];
  const daysDiff = Math.ceil(
    (defaultEndDate.getTime() - defaultStartDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const maxDays = Math.min(daysDiff, 30); // Limit to 30 days for performance

  for (let i = maxDays - 1; i >= 0; i--) {
    const date = new Date(defaultEndDate);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayOrders = completedOrders.filter(
      (o) => o.completedAt && o.completedAt >= date && o.completedAt < nextDate,
    );

    const dayRevenue = dayOrders.reduce(
      (sum, o) => sum + parseFloat(o.vendorAmount.toString()),
      0,
    );
    const dayCustomers = new Set(dayOrders.map((o) => o.customerId)).size;

    timeSeries.push({
      date: date.toISOString(),
      revenue: dayRevenue,
      orders: dayOrders.length,
      customers: dayCustomers,
    });
  }

  // Additional metrics
  const totalOrders = allOrders.length;
  const conversionRate =
    totalOrders > 0 ? (ordersCompleted / totalOrders) * 100 : 0;

  // Calculate average response time (time from order creation to acceptance)
  const acceptedOrders = await prisma.order.findMany({
    where: {
      businessId,
      status: { in: ["ACCEPTED", "IN_PROGRESS", "COMPLETED"] },
      createdAt: {
        gte: defaultStartDate,
        lte: defaultEndDate,
      },
    },
    select: {
      createdAt: true,
      updatedAt: true,
    },
  });

  const responseTimes = acceptedOrders
    .map((o) => {
      // Find when status changed to ACCEPTED (approximate)
      return (o.updatedAt.getTime() - o.createdAt.getTime()) / (1000 * 60); // in minutes
    })
    .filter((time) => time > 0);

  const averageResponseTime =
    responseTimes.length > 0
      ? responseTimes.reduce((sum, time) => sum + time, 0) /
        responseTimes.length
      : 0;

  const completionRate =
    totalOrders > 0 ? (ordersCompleted / totalOrders) * 100 : 0;

  // Refund rate (from payments)
  const payments = await prisma.payment.findMany({
    where: {
      order: {
        businessId,
      },
      status: {
        in: ["CAPTURED", "REFUNDED"],
      },
    },
    select: {
      status: true,
    },
  });

  const refundedCount = payments.filter((p) => p.status === "REFUNDED").length;
  const refundRate =
    payments.length > 0 ? (refundedCount / payments.length) * 100 : 0;

  return {
    revenue: {
      today: todayRevenue,
      thisWeek: thisWeekRevenue,
      thisMonth: thisMonthRevenue,
      lastMonth: lastMonthRevenue,
      trend: revenueTrend,
      total: totalRevenue,
    },
    orders: {
      today: todayOrders,
      thisWeek: thisWeekOrders,
      thisMonth: thisMonthOrders,
      lastMonth: lastMonthOrdersCount,
      trend: orderTrend,
      total: totalOrders,
      completed: ordersCompleted,
      cancelled: ordersCancelled,
      pending: ordersPending,
    },
    customers: {
      total: uniqueCustomers.size,
      new: newCustomers,
      returning: uniqueCustomers.size - newCustomers,
      averageOrderValue,
      lifetimeValue: averageOrderValue * 2, // Simplified calculation
    },
    ratings: {
      average: business.avgRating || 0,
      count: business.reviewCount || 0,
      trend: ratingTrend,
      distribution: ratingDistribution,
    },
    topProducts,
    timeSeries,
    conversionRate,
    averageResponseTime,
    completionRate,
    refundRate,
  };
}
