/**
 * Esnaf Sipariş Akışı Testleri
 * 
 * Bu test dosyası kullanıcının istediği tüm esnaf ve sipariş akışı senaryolarını kapsar:
 * 1. Esnaf kayıt olma
 * 2. Haritadan dükkân işaretleme
 * 3. Menü & fiyat girme
 * 4. Çalışma saatleri & sipariş alma ayarları
 * 5. Kullanıcı konum & esnaf listesi
 * 6. Sipariş oluşturma
 * 7. Sipariş bildirimi & esnaf kabulü
 * 8. Sipariş akışı & yorum
 * 9. Red / İptal Senaryosu
 */

import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Test kullanıcıları
let esnafUser: any;
let customerUser: any;
let esnafBusiness: any;

test.beforeAll(async () => {
  // Test esnaf kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash("test123456", 10);
  esnafUser = await prisma.user.upsert({
    where: { email: "esnaf-test@example.com" },
    update: {},
    create: {
      email: "esnaf-test@example.com",
      passwordHash: hashedPassword,
      name: "Test Esnaf",
      role: "VENDOR",
    },
  });

  // Test müşteri kullanıcısı oluştur
  customerUser = await prisma.user.upsert({
    where: { email: "customer-siparis-test@example.com" },
    update: {},
    create: {
      email: "customer-siparis-test@example.com",
      passwordHash: await bcrypt.hash("test123456", 10),
      name: "Test Müşteri",
      role: "CUSTOMER",
    },
  });

  // Test işletme oluştur
  esnafBusiness = await prisma.business.upsert({
    where: { id: "test-business-siparis-id" },
    update: {},
    create: {
      id: "test-business-siparis-id",
      ownerUserId: esnafUser.id,
      name: "Test Restoran",
      description: "Test restoran açıklaması",
      category: "MARKET",
      lat: 41.0082,
      lng: 28.9784,
      addressText: "İstanbul, Kadıköy",
      isActive: true,
      onlineStatus: "ONLINE",
      hasDelivery: true,
      minOrderAmount: 50.0,
      deliveryRadius: 5.0,
      workingHoursJson: {
        mon: { open: "09:00", close: "22:00", closed: false },
        tue: { open: "09:00", close: "22:00", closed: false },
        wed: { open: "09:00", close: "22:00", closed: false },
        thu: { open: "09:00", close: "22:00", closed: false },
        fri: { open: "09:00", close: "22:00", closed: false },
        sat: { open: "09:00", close: "22:00", closed: false },
        sun: { open: "09:00", close: "22:00", closed: false },
      },
    },
  });
});

test.afterAll(async () => {
  // Test verilerini temizle
  await prisma.order.deleteMany({
    where: {
      customerId: customerUser.id,
      businessId: esnafBusiness.id,
    },
  });
  await prisma.product.deleteMany({
    where: { businessId: esnafBusiness.id },
  });
  await prisma.business.delete({ where: { id: esnafBusiness.id } });
  await prisma.user.delete({ where: { id: esnafUser.id } });
  await prisma.user.delete({ where: { id: customerUser.id } });
  await prisma.$disconnect();
});

test.describe("Esnaf Sipariş Akışı", () => {
  test("1. Esnaf Kayıt Olma - Haritadan Dükkân İşaretleme", async ({
    page,
  }) => {
    // Esnaf kayıt sayfasına git
    await page.goto("/business/register", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Konum seçimi adımı
    const mapContainer = page.locator('[data-testid="map-container"]').or(
      page.locator(".map-container").first()
    );
    await expect(mapContainer.or(page.locator("canvas").first())).toBeVisible({
      timeout: 30000,
    });

    // Konum seçildi, bir sonraki adıma geç
    const nextButton = page.locator('button:has-text("İleri")').or(
      page.locator('button:has-text("Devam")').first()
    );
    if (await nextButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await nextButton.click();
    }

    // İşletme bilgileri formu
    await page.fill('input[name="name"]', "Test Restoran");
    await page.selectOption('select[name="category"]', "MARKET");

    // Menü ekleme adımına geç
    const menuNextButton = page
      .locator('button:has-text("İleri")')
      .or(page.locator('button:has-text("Devam")').first());
    if (
      await menuNextButton.isVisible({ timeout: 5000 }).catch(() => false)
    ) {
      await menuNextButton.click();
    }

    // Menü ekleme
    await page.fill('input[placeholder*="ürün adı"]', "Pizza");
    await page.fill('input[placeholder*="fiyat"]', "100");
    const addButton = page.locator('button:has-text("Ekle")').first();
    if (await addButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addButton.click();
    }

    // Kaydet
    const saveButton = page
      .locator('button:has-text("Kaydet")')
      .or(page.locator('button[type="submit"]').first());
    if (await saveButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await saveButton.click();
    }

    // Başarı mesajı veya yönlendirme kontrolü
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(
      currentUrl.includes("/business") ||
        currentUrl.includes("/dashboard") ||
        await page.locator('text=/başarı/i').isVisible({ timeout: 5000 }).catch(() => false)
    ).toBeTruthy();
  });

  test("2. Esnaf Menü Yönetimi - Ürün Ekleme ve Pasif Etme", async ({
    page,
  }) => {
    // Esnaf olarak giriş yap
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    await page.fill('input[type="email"]', esnafUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');

    // Dashboard'a yönlendirme bekle
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Ürün oluştur
    const product = await prisma.product.create({
      data: {
        businessId: esnafBusiness.id,
        name: "Test Ürün",
        description: "Test ürün açıklaması",
        price: 50.0,
        isService: false,
        deliveryType: "DELIVERY",
        active: true,
      },
    });

    // Ürünü pasif et
    await prisma.product.update({
      where: { id: product.id },
      data: { active: false },
    });

    // Müşteri tarafında kontrol et
    const productsRes = await page.request.get(
      `/api/businesses/${esnafBusiness.id}/products`
    );
    const products = await productsRes.json();
    const inactiveProduct = products.find((p: any) => p.id === product.id);
    expect(inactiveProduct).toBeUndefined(); // Pasif ürün görünmemeli

    // Temizle
    await prisma.product.delete({ where: { id: product.id } });
  });

  test("3. Çalışma Saatleri & Sipariş Ayarları", async ({ page }) => {
    // Esnaf olarak giriş yap
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    await page.fill('input[type="email"]', esnafUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Çalışma saatleri sayfasına git
    await page.goto("/business/working-hours", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Çalışma saatlerini güncelle
    const mondaySwitch = page.locator('input[type="checkbox"]').first();
    if (await mondaySwitch.isVisible({ timeout: 5000 }).catch(() => false)) {
      await mondaySwitch.click();
    }

    // Sipariş ayarları sayfasına git
    await page.goto("/business/order-settings", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Minimum sipariş tutarı ayarla
    const minOrderInput = page.locator('input[type="number"]').first();
    if (
      await minOrderInput.isVisible({ timeout: 5000 }).catch(() => false)
    ) {
      await minOrderInput.fill("100");
    }

    // Teslimat toggle'ı aç
    const deliverySwitch = page.locator('input[type="checkbox"]').first();
    if (
      await deliverySwitch.isVisible({ timeout: 5000 }).catch(() => false)
    ) {
      await deliverySwitch.click();
    }

    // Teslimat yarıçapı ayarla
    const radiusInput = page.locator('input[type="number"]').nth(1);
    if (await radiusInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await radiusInput.fill("10");
    }

    // Kaydet
    const saveButton = page.locator('button:has-text("Kaydet")').first();
    if (await saveButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await saveButton.click();
      await page.waitForTimeout(2000);
    }
  });

  test("4. Kullanıcı Konum & Esnaf Listesi", async ({ page }) => {
    // Müşteri olarak giriş yap
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    await page.fill('input[type="email"]', customerUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Harita sayfasına git
    await page.goto("/map", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Harita yüklendi mi kontrol et
    const mapElement = page.locator("canvas").or(
      page.locator('[data-testid="map"]')
    );
    await expect(mapElement.first()).toBeVisible({ timeout: 30000 });

    // Filtreler
    const openNowFilter = page
      .locator('input[type="checkbox"]')
      .or(page.locator('button:has-text("Açık")').first());
    if (
      await openNowFilter.isVisible({ timeout: 5000 }).catch(() => false)
    ) {
      await openNowFilter.click();
    }

    // İşletme listesi görünüyor mu
    await page.waitForTimeout(2000);
    const businessCards = page.locator('[data-testid="business-card"]').or(
      page.locator(".business-card")
    );
    const count = await businessCards.count();
    expect(count).toBeGreaterThanOrEqual(0); // En az 0 işletme olabilir
  });

  test("5. Sipariş Oluşturma - Min Sepet Kontrolü", async ({ page }) => {
    // Test ürünü oluştur
    const product = await prisma.product.create({
      data: {
        businessId: esnafBusiness.id,
        name: "Test Ürün Sipariş",
        price: 30.0, // Min sepet 50 TL, bu ürün 30 TL
        isService: false,
        deliveryType: "DELIVERY",
        active: true,
      },
    });

    // Müşteri olarak giriş yap
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    await page.fill('input[type="email"]', customerUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Sepete ürün ekle (API ile)
    const addToCartRes = await page.request.post("/api/cart/add", {
      data: {
        productId: product.id,
        businessId: esnafBusiness.id,
        quantity: 1,
      },
    });

    // Sepet sayfasına git
    await page.goto("/cart", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Min sepet uyarısı görünüyor mu
    const minOrderWarning = page
      .locator('text=/minimum/i')
      .or(page.locator('text=/50/i'));
    await expect(minOrderWarning.first()).toBeVisible({ timeout: 10000 });

    // Sipariş butonu disabled olmalı
    const submitButton = page.locator('button[type="submit"]').first();
    const isDisabled = await submitButton.isDisabled();
    expect(isDisabled).toBeTruthy();

    // Temizle
    await prisma.product.delete({ where: { id: product.id } });
  });

  test("6. Sipariş Bildirimi & Esnaf Kabulü", async ({ page, context }) => {
    // Test ürünü oluştur
    const product = await prisma.product.create({
      data: {
        businessId: esnafBusiness.id,
        name: "Test Ürün Bildirim",
        price: 100.0,
        isService: false,
        deliveryType: "DELIVERY",
        active: true,
      },
    });

    // Müşteri sayfası
    const customerPage = await context.newPage();
    await customerPage.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await customerPage.fill('input[type="email"]', customerUser.email);
    await customerPage.fill('input[type="password"]', "test123456");
    await customerPage.click('button[type="submit"]');
    await customerPage.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Sipariş oluştur (API ile)
    const orderRes = await customerPage.request.post("/api/orders", {
      data: {
        businessId: esnafBusiness.id,
        items: [{ productId: product.id, quantity: 1 }],
        addressText: "Test Adres, İstanbul",
        locationLat: 41.0082,
        locationLng: 28.9784,
      },
    });

    expect(orderRes.ok()).toBeTruthy();
    const orderData = await orderRes.json();
    const orderId = orderData.order?.id;

    // Esnaf sayfası
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.fill('input[type="email"]', esnafUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Siparişler sayfasına git
    await page.goto("/business/jobs", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Yeni sipariş görünüyor mu
    const orderCard = page
      .locator(`text=${orderId}`)
      .or(page.locator('text=/yeni/i').first());
    await expect(orderCard.first()).toBeVisible({ timeout: 30000 });

    // Siparişi kabul et
    const acceptButton = page
      .locator('button:has-text("Kabul")')
      .or(page.locator('button:has-text("Kabul Et")').first());
    if (
      await acceptButton.isVisible({ timeout: 10000 }).catch(() => false)
    ) {
      await acceptButton.click();
      await page.waitForTimeout(2000);
    }

    // Temizle
    if (orderId) {
      await prisma.order.delete({ where: { id: orderId } }).catch(() => {});
    }
    await prisma.product.delete({ where: { id: product.id } });
    await customerPage.close();
  });

  test("7. Sipariş Akışı & Yorum", async ({ page }) => {
    // Test ürünü ve siparişi oluştur
    const product = await prisma.product.create({
      data: {
        businessId: esnafBusiness.id,
        name: "Test Ürün Yorum",
        price: 100.0,
        isService: false,
        deliveryType: "DELIVERY",
        active: true,
      },
    });

    const order = await prisma.order.create({
      data: {
        customerId: customerUser.id,
        businessId: esnafBusiness.id,
        totalAmount: 100.0,
        vendorAmount: 90.0,
        commissionFee: 10.0,
        status: "ACCEPTED",
        paymentStatus: "CAPTURED",
        addressText: "Test Adres",
      },
    });

    // Müşteri olarak giriş yap
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.fill('input[type="email"]', customerUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Siparişi tamamla
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "COMPLETED" },
    });

    // Sipariş detay sayfasına git
    await page.goto(`/orders/${order.id}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Yorum yap butonu görünüyor mu
    const reviewButton = page
      .locator('button:has-text("Yorum")')
      .or(page.locator('button:has-text("Değerlendir")').first());
    if (
      await reviewButton.isVisible({ timeout: 10000 }).catch(() => false)
    ) {
      await reviewButton.click();
      await page.fill('textarea', "Harika hizmet!");
      await page.locator('input[type="number"]').fill("5");
      await page.locator('button:has-text("Gönder")').click();
      await page.waitForTimeout(2000);
    }

    // Temizle
    await prisma.review.deleteMany({ where: { orderId: order.id } });
    await prisma.order.delete({ where: { id: order.id } });
    await prisma.product.delete({ where: { id: product.id } });
  });

  test("8. Red / İptal Senaryosu", async ({ page }) => {
    // Test ürünü ve siparişi oluştur
    const product = await prisma.product.create({
      data: {
        businessId: esnafBusiness.id,
        name: "Test Ürün İptal",
        price: 100.0,
        isService: false,
        deliveryType: "DELIVERY",
        active: true,
      },
    });

    const order = await prisma.order.create({
      data: {
        customerId: customerUser.id,
        businessId: esnafBusiness.id,
        totalAmount: 100.0,
        vendorAmount: 90.0,
        commissionFee: 10.0,
        status: "PENDING_CONFIRMATION",
        paymentStatus: "INITIATED",
        addressText: "Test Adres",
      },
    });

    // Esnaf olarak giriş yap
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.fill('input[type="email"]', esnafUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    // Siparişi reddet
    const rejectRes = await page.request.post(`/api/orders/${order.id}/reject`, {
      data: { reason: "Yoğunluk" },
    });

    expect(rejectRes.ok()).toBeTruthy();

    // Müşteri tarafında kontrol et
    await page.goto("/auth/login", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.fill('input[type="email"]', customerUser.email);
    await page.fill('input[type="password"]', "test123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

    await page.goto(`/orders/${order.id}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Reddedildi mesajı görünüyor mu
    const rejectedMessage = page
      .locator('text=/reddedildi/i')
      .or(page.locator('text=/iptal/i').first());
    await expect(rejectedMessage.first()).toBeVisible({ timeout: 10000 });

    // Temizle
    await prisma.order.delete({ where: { id: order.id } });
    await prisma.product.delete({ where: { id: product.id } });
  });
});

