import { prisma } from "@/lib/db/prisma";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

/**
 * Sipariş oluşturma (PENDING_CONFIRMATION)
 */
export async function createOrder(data: {
  customerId: string;
  businessId: string;
  items: Array<{ productId: string; quantity: number }>;
  addressText: string;
  locationLat?: number;
  locationLng?: number;
  scheduledAt?: Date;
}) {
  // Ürünleri getir ve fiyatları kontrol et
  const productIds = data.items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      businessId: data.businessId,
      active: true,
    },
  });

  if (products.length !== productIds.length) {
    throw new Error("Bazı ürünler bulunamadı veya aktif değil");
  }

  // Toplam tutarı hesapla
  let totalAmount = new Decimal(0);
  const orderItems = data.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    const unitPrice = product.price;
    const totalPrice = unitPrice.mul(item.quantity);
    totalAmount = totalAmount.add(totalPrice);

    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice,
      totalPrice,
    };
  });

  // Platform komisyonu hesapla (%10 örnek - ileride config'den alınabilir)
  const COMMISSION_RATE = 0.1;
  const commissionFee = totalAmount.mul(COMMISSION_RATE);
  const vendorAmount = totalAmount.sub(commissionFee); // Vendor'ın alacağı pay

  // Business owner'ı bul (vendorId için)
  const business = await prisma.business.findUnique({
    where: { id: data.businessId },
    select: { ownerUserId: true },
  });

  if (!business) {
    throw new Error("İşletme bulunamadı");
  }

  // Transaction ile sipariş ve ödeme kaydı oluştur
  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: data.customerId,
        businessId: data.businessId,
        totalAmount,
        vendorAmount, // FAZ 3: Vendor pay
        commissionFee, // Platform komisyonu
        status: "PENDING_CONFIRMATION",
        paymentStatus: "INITIATED", // FAZ 3: INITIATED
        addressText: data.addressText,
        locationLat: data.locationLat,
        locationLng: data.locationLng,
        scheduledAt: data.scheduledAt,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        business: true,
        customer: true,
      },
    });

    // FAZ 3: Payment kaydı (customerId, vendorId, platformFee, vendorShare ile)
    await tx.payment.create({
      data: {
        orderId: order.id,
        customerId: data.customerId,
        vendorId: business.ownerUserId,
        amount: totalAmount,
        platformFee: commissionFee,
        vendorShare: vendorAmount,
        status: "INITIATED",
        provider: "mock",
      },
    });

    return order;
  });

  return result;
}

/**
 * Sipariş kabul etme (ACCEPTED)
 * - Ödeme capture edilir
 * - İşletme ban kontrolü yapılır
 */
export async function acceptOrder(orderId: string, businessId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { business: true },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı");
  }

  if (order.businessId !== businessId) {
    throw new Error("Bu sipariş bu işletmeye ait değil");
  }

  if (order.status !== "PENDING_CONFIRMATION") {
    throw new Error("Sipariş durumu kabul edilemez");
  }

  // Ban kontrolü
  if (order.business.bannedUntil && order.business.bannedUntil > new Date()) {
    throw new Error("Banlı işletme sipariş kabul edemez");
  }

  // Transaction ile güncelle
  return prisma.$transaction(async (tx) => {
    // Ödeme authorize (henüz capture değil, iş tamamlanınca capture olacak)
    await tx.payment.update({
      where: { orderId },
      data: { status: "AUTHORIZED" },
    });

    // Sipariş durumu
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: {
        status: "ACCEPTED",
        paymentStatus: "AUTHORIZED", // FAZ 3: AUTHORIZED
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        business: true,
        customer: true,
      },
    });

    return updatedOrder;
  });
}

/**
 * Sipariş reddetme (CANCELLED_BY_PROVIDER)
 * - Kabul edilmeden önce reddedilirse ceza yok
 */
export async function rejectOrder(orderId: string, businessId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı");
  }

  if (order.businessId !== businessId) {
    throw new Error("Bu sipariş bu işletmeye ait değil");
  }

  if (order.status !== "PENDING_CONFIRMATION") {
    throw new Error("Sipariş durumu reddedilemez");
  }

  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: "CANCELLED_BY_PROVIDER",
    },
  });
}

/**
 * Esnaf tarafından iptal (CANCELLED_BY_PROVIDER)
 * - ACCEPTED veya IN_PROGRESS durumundaysa ceza uygulanır
 */
export async function cancelOrderByProvider(
  orderId: string,
  businessId: string,
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { business: true },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı");
  }

  if (order.businessId !== businessId) {
    throw new Error("Bu sipariş bu işletmeye ait değil");
  }

  if (!["ACCEPTED", "IN_PROGRESS"].includes(order.status)) {
    throw new Error("Bu durumdaki sipariş iptal edilemez");
  }

  // Transaction ile iptal + ceza kontrolü
  return prisma.$transaction(async (tx) => {
    // Ödeme iade (mock)
    if (order.paymentStatus === "CAPTURED") {
      await tx.payment.update({
        where: { orderId },
        data: { status: "REFUNDED" },
      });
    }

    // Sipariş iptal
    await tx.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED_BY_PROVIDER",
        paymentStatus:
          order.paymentStatus === "CAPTURED" ? "REFUNDED" : order.paymentStatus,
      },
    });

    // Ceza: consecutive_cancellations artır
    const updatedBusiness = await tx.business.update({
      where: { id: businessId },
      data: {
        consecutiveCancellations: {
          increment: 1,
        },
      },
    });

    // 3 veya daha fazla ise ban
    if (updatedBusiness.consecutiveCancellations >= 3) {
      const bannedUntil = new Date();
      bannedUntil.setDate(bannedUntil.getDate() + 7); // 7 gün ban

      await tx.business.update({
        where: { id: businessId },
        data: {
          bannedUntil,
          onlineStatus: "OFFLINE",
          consecutiveCancellations: 0, // Reset
        },
      });

      // Ban log
      await tx.businessBan.create({
        data: {
          businessId,
          reason: "3 kez üst üste iptal",
          bannedFrom: new Date(),
          bannedUntil,
        },
      });
    }

    return updatedBusiness;
  });
}

/**
 * Müşteri tarafından iptal
 */
export async function cancelOrderByCustomer(
  orderId: string,
  customerId: string,
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı");
  }

  if (order.customerId !== customerId) {
    throw new Error("Bu sipariş size ait değil");
  }

  if (!["PENDING_CONFIRMATION", "ACCEPTED"].includes(order.status)) {
    throw new Error("Bu durumdaki sipariş iptal edilemez");
  }

  // Transaction
  return prisma.$transaction(async (tx) => {
    // Ödeme iade (eğer capture edildiyse)
    if (order.paymentStatus === "CAPTURED") {
      await tx.payment.update({
        where: { orderId },
        data: { status: "REFUNDED" },
      });
    }

    return tx.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED_BY_CUSTOMER",
        paymentStatus:
          order.paymentStatus === "CAPTURED" ? "REFUNDED" : order.paymentStatus,
      },
    });
  });
}

/**
 * İş durumu güncelleme (IN_PROGRESS, COMPLETED)
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  userId: string,
  userRole: "customer" | "business",
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı");
  }

  // Yetki kontrolü
  if (userRole === "customer" && order.customerId !== userId) {
    throw new Error("Yetkisiz erişim");
  }
  if (userRole === "business") {
    const business = await prisma.business.findFirst({
      where: { id: order.businessId, ownerUserId: userId },
    });
    if (!business) {
      throw new Error("Yetkisiz erişim");
    }
  }

  // Durum geçişleri
  if (status === "IN_PROGRESS" && order.status !== "ACCEPTED") {
    throw new Error("Sadece ACCEPTED siparişler IN_PROGRESS yapılabilir");
  }

  if (
    status === "COMPLETED" &&
    !["ACCEPTED", "IN_PROGRESS"].includes(order.status)
  ) {
    throw new Error(
      "Sadece ACCEPTED veya IN_PROGRESS siparişler tamamlanabilir",
    );
  }

  // IN_PROGRESS durumunda: expected_delivery_at set et ve DeliveryReminder oluştur
  if (status === "IN_PROGRESS" && order.status !== "IN_PROGRESS") {
    const now = new Date();
    const expectedDeliveryAt = new Date(now.getTime() + 20 * 60 * 1000); // 20 dakika sonra (varsayılan, gerçek hesaplama lojistik mantığına göre yapılabilir)
    const remindAt = new Date(expectedDeliveryAt.getTime() - 5 * 60 * 1000); // 5 dakika önce

    return prisma.$transaction(async (tx) => {
      // Order'ı IN_PROGRESS yap ve expected_delivery_at set et
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: "IN_PROGRESS",
          expectedDeliveryAt,
        },
      });

      // DeliveryReminder oluştur (zaten varsa güncelle)
      await tx.deliveryReminder.upsert({
        where: { orderId },
        create: {
          orderId,
          remindAt,
          processed: false,
        },
        update: {
          remindAt,
          processed: false, // Yeni bir reminder varsa tekrar işlenebilir
        },
      });

      return updatedOrder;
    });
  }

  // COMPLETED durumunda: completedAt set, payment capture, wallet update, notification
  if (status === "COMPLETED") {
    // Business owner'ı bul (vendorId için)
    const business = await prisma.business.findUnique({
      where: { id: order.businessId },
      select: { ownerUserId: true },
    });

    if (!business) {
      throw new Error("İşletme bulunamadı");
    }

    return prisma.$transaction(async (tx) => {
      // Payment'ı CAPTURED yap
      const payment = await tx.payment.findUnique({
        where: { orderId },
      });

      if (payment) {
        await tx.payment.update({
          where: { orderId },
          data: { status: "CAPTURED" },
        });
      }

      // Order'ı COMPLETED yap ve completedAt set et
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: "COMPLETED",
          paymentStatus: "CAPTURED",
          completedAt: new Date(),
        },
        include: {
          business: true,
          customer: true,
        },
      });

      // İşletmenin iptal sayacını sıfırla
      await tx.business.update({
        where: { id: order.businessId },
        data: {
          consecutiveCancellations: 0,
        },
      });

      // Vendor wallet'a ödeme ekle (pendingBalance'e)
      if (payment && payment.vendorShare) {
        const { addVendorPayment } =
          await import("@/lib/services/walletService");
        // Transaction dışında çalıştır (wallet service kendi transaction'ını yönetir)
        Promise.resolve().then(async () => {
          try {
            await addVendorPayment(
              business.ownerUserId,
              payment.vendorShare,
              orderId,
            );
          } catch (walletError) {
            console.error("Wallet güncelleme hatası:", walletError);
          }
        });
      }

      // Notification oluştur (transaction dışında)
      Promise.resolve().then(async () => {
        try {
          const { createNotification } =
            await import("@/lib/notifications/createNotification");

          // Müşteriye bildirim
          await createNotification({
            userId: order.customerId,
            type: "ORDER_COMPLETED",
            title: "Sipariş Tamamlandı",
            body: `${updatedOrder.business.name} siparişinizi tamamladı. Lütfen değerlendirme yapın.`,
            data: { orderId: orderId },
          });

          // Vendor'a bildirim
          await createNotification({
            userId: business.ownerUserId,
            type: "ORDER_COMPLETED",
            title: "Sipariş Tamamlandı",
            body: `Sipariş #${orderId.slice(0, 8)} tamamlandı. Ödeme cüzdanınıza eklendi.`,
            data: { orderId: orderId },
          });
        } catch (notifError) {
          console.error("Notification oluşturma hatası:", notifError);
        }
      });

      // Referral reward dağıtımı (async olarak çalıştır)
      Promise.resolve().then(async () => {
        try {
          const { distributeReferralRewards } =
            await import("@/lib/services/referralService");
          await distributeReferralRewards(orderId);
        } catch (refError) {
          console.error("Referral reward dağıtım hatası:", refError);
        }
      });

      return updatedOrder;
    });
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}

/**
 * Müşteri siparişleri
 */
export async function getCustomerOrders(customerId: string) {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      business: {
        select: {
          id: true,
          name: true,
          category: true,
          coverImageUrl: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
      review: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * İşletme siparişleri
 */
export async function getBusinessOrders(
  businessId: string,
  status?: OrderStatus,
) {
  const where: any = { businessId };
  if (status) {
    where.status = status;
  }

  return prisma.order.findMany({
    where,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
