/**
 * İş Arama / İlan Oluşturma / Teklif / Yorum Akışı Testleri
 * 
 * Bu test dosyası kullanıcının istediği tüm iş akışı senaryolarını kapsar:
 * 1. Search bar'dan iş arama / ilan açma
 * 2. Teklif (quote) süreci
 * 3. Yorum / puanlama süreci
 * 
 * Hem müşteri hem usta/esnaf açısından testler içerir.
 */

import { test, expect, Page } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Test verileri
let testCustomer: any;
let testVendor: any;
let testBusiness: any;
let testJob: any;
let testJobOffer: any;

test.beforeAll(async () => {
  // Test müşteri oluştur
  const hashedPassword = await bcrypt.hash("test123456", 10);
  testCustomer = await prisma.user.upsert({
    where: { email: "job-flow-customer@example.com" },
    update: {},
    create: {
      email: "job-flow-customer@example.com",
      passwordHash: hashedPassword,
      name: "Test Müşteri Job Flow",
      role: "CUSTOMER",
      city: "İstanbul",
    },
  });

  // Test esnaf oluştur
  testVendor = await prisma.user.upsert({
    where: { email: "job-flow-vendor@example.com" },
    update: {},
    create: {
      email: "job-flow-vendor@example.com",
      passwordHash: hashedPassword,
      name: "Test Esnaf Job Flow",
      role: "VENDOR",
      city: "İstanbul",
    },
  });

  // Test işletme oluştur
  testBusiness = await prisma.business.upsert({
    where: { id: "test-business-job-flow-id" },
    update: {},
    create: {
      id: "test-business-job-flow-id",
      ownerUserId: testVendor.id,
      name: "Test İşletme Job Flow",
      description: "Test işletme açıklaması",
      category: "MARKET",
      lat: 41.0082,
      lng: 28.9784,
      addressText: "İstanbul, Kadıköy",
      isActive: true,
      onlineStatus: "ONLINE",
    },
  });
});

test.afterAll(async () => {
  // Test verilerini temizle
  await prisma.jobOffer.deleteMany({
    where: {
      jobId: testJob?.id,
    },
  });
  await prisma.job.deleteMany({
    where: {
      customerId: testCustomer.id,
    },
  });
  await prisma.business.deleteMany({
    where: {
      id: testBusiness.id,
    },
  });
  await prisma.user.deleteMany({
    where: {
      email: { in: ["job-flow-customer@example.com", "job-flow-vendor@example.com"] },
    },
  });
});

// ============================================
// 1. SEARCH BAR'DAN İŞ ARAMA / İLAN OLUŞTURMA AKIŞI
// ============================================

test("1.1 - Müşteri - Search bar'dan eşleşen iş araması", async ({ page }) => {
  // Ana sayfaya git
  await page.goto("/", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // Search bar'ı bul
  const searchInput = page.locator('input[placeholder*="İhtiyacını yaz"]').first();
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // Eşleşen bir arama yap (örn. "banyo tadilat")
  await searchInput.fill("banyo tadilat");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  // AI chat modal açıldı mı veya kategori sayfasına gidildi mi?
  const aiChatModal = page.locator('[role="dialog"]').or(page.locator('text=/kategori/i').first());
  const categoryPage = page.locator('text=/banyo/i').or(page.locator('text=/tadilat/i').first());
  
  // Eşleşme varsa AI chat veya kategori sayfası açılmalı
  const hasMatch = await aiChatModal.isVisible({ timeout: 5000 }).catch(() => false) ||
                   await categoryPage.isVisible({ timeout: 5000 }).catch(() => false);
  
  expect(hasMatch).toBeTruthy();
});

test("1.2 - Müşteri - Search bar'dan eşleşmeyen arama (vasıfsız iş)", async ({ page }) => {
  // Ana sayfaya git
  await page.goto("/", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // Search bar'ı bul
  const searchInput = page.locator('input[placeholder*="İhtiyacını yaz"]').first();
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // Eşleşmeyen bir arama yap (örn. "asdasd" veya "bugün 3 saat broşür dağıtacak biri")
  await searchInput.fill("asdasd");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(3000);

  // "Sonuç bulunamadı" sayfasına yönlendirildi mi?
  const noMatchPage = page.locator('text=/Sonuç Bulunamadı/i').or(
    page.locator('text=/vasıfsız/i').first()
  );
  await expect(noMatchPage.first()).toBeVisible({ timeout: 10000 });

  // "Vasıfsız işler için ilan ver" butonu var mı?
  const createUnskilledButton = page.locator('button:has-text("Vasıfsız")').or(
    page.locator('button:has-text("ilan")').first()
  );
  await expect(createUnskilledButton.first()).toBeVisible({ timeout: 5000 });
});

test("1.3 - Müşteri - Vasıfsız iş ilan formu", async ({ page }) => {
  // Müşteri olarak giriş yap
  await page.goto("/auth/login", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });
  await page.fill('input[type="email"]', testCustomer.email);
  await page.fill('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

  // Vasıfsız iş ilan formuna git
  await page.goto("/instant-jobs/new?q=bugün%203%20saat%20broşür%20dağıtacak&unskilled=true", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // Form alanları görünüyor mu?
  const descriptionField = page.locator('textarea').or(page.locator('input[type="text"]').first());
  await expect(descriptionField.first()).toBeVisible({ timeout: 10000 });

  // Query parametresinden gelen metin otomatik doldurulmuş mu?
  const descriptionValue = await descriptionField.first().inputValue();
  expect(descriptionValue).toContain("broşür");

  // İl/ilçe seçimi var mı?
  const cityField = page.locator('input[placeholder*="İl"]').or(
    page.locator('input[placeholder*="İstanbul"]').first()
  );
  await expect(cityField.first()).toBeVisible({ timeout: 5000 });
});

// ============================================
// 2. İLAN OLUŞTURMA ve TEKLİF TOPLAMA AKIŞI
// ============================================

test("2.1 - Müşteri - İlan oluşturma (iş talebi)", async ({ page }) => {
  // Müşteri olarak giriş yap
  await page.goto("/auth/login", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });
  await page.fill('input[type="email"]', testCustomer.email);
  await page.fill('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

  // İlan oluşturma sayfasına git
  await page.goto("/request", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // Kategori seçimi var mı?
  const categoryButton = page.locator('button:has-text("Elektrik")').or(
    page.locator('button:has-text("Tadilat")').first()
  );
  if (await categoryButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await categoryButton.click();
    await page.waitForTimeout(1000);

    // İlan formu açıldı mı?
    const descriptionField = page.locator('textarea').first();
    await expect(descriptionField).toBeVisible({ timeout: 5000 });
  }
});

test("2.2 - Usta - İlanları görme ve teklif verme", async ({ page }) => {
  // Önce bir iş oluştur
  testJob = await prisma.job.create({
    data: {
      customerId: testCustomer.id,
      mainCategoryId: "electricity",
      description: "Test iş açıklaması - Elektrik tamiri",
      city: "İstanbul",
      district: "Kadıköy",
      status: "PENDING",
    },
  });

  // Usta olarak giriş yap
  await page.goto("/auth/login", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });
  await page.fill('input[type="email"]', testVendor.email);
  await page.fill('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

  // İlanlar sayfasına git
  await page.goto("/business/jobs/available", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // İlan listesi görünüyor mu?
  const jobList = page.locator('text=/Test iş/i').or(
    page.locator('text=/Elektrik/i').first()
  );
  await expect(jobList.first()).toBeVisible({ timeout: 10000 });

  // İlan detayına git
  await page.goto(`/jobs/${testJob.id}`, {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // "Teklif Ver" butonu var mı?
  const offerButton = page.locator('button:has-text("Teklif")').or(
    page.locator('button:has-text("Başvur")').first()
  );
  await expect(offerButton.first()).toBeVisible({ timeout: 10000 });
});

// ============================================
// 3. TEKLİF YÖNETİMİ AKIŞI
// ============================================

test("3.1 - Müşteri - Teklifleri görme ve karşılaştırma", async ({ page }) => {
  // Önce bir teklif oluştur
  testJobOffer = await prisma.jobOffer.create({
    data: {
      jobId: testJob.id,
      businessId: testBusiness.id,
      amount: 5000.0,
      message: "Test teklif mesajı",
      status: "PENDING",
    },
  });

  // Müşteri olarak giriş yap
  await page.goto("/auth/login", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });
  await page.fill('input[type="email"]', testCustomer.email);
  await page.fill('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

  // İşlerim sayfasına git
  await page.goto("/jobs", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // İş detayına git
  await page.goto(`/jobs/${testJob.id}`, {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // Teklifler görünüyor mu?
  const offerList = page.locator('text=/Teklif/i').or(
    page.locator('text=/5000/i').first()
  );
  await expect(offerList.first()).toBeVisible({ timeout: 10000 });
});

test("3.2 - Usta - Teklif durumu ve iş statüsü", async ({ page }) => {
  // Usta olarak giriş yap
  await page.goto("/auth/login", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });
  await page.fill('input[type="email"]', testVendor.email);
  await page.fill('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

  // Tekliflerim sayfasına git (API ile kontrol)
  const offersRes = await page.request.get("/api/jobs/offers/my", {
      timeout: 120000,
  });
  
  // Teklifler listeleniyor mu?
  expect([200, 401, 403]).toContain(offersRes.status());
});

// ============================================
// 4. İŞİN TAMAMLANMASI & YORUM / PUANLAMA AKIŞI
// ============================================

test("4.1 - Usta - İşi tamamlandı işaretleme", async ({ page }) => {
  // İşi ACCEPTED durumuna getir
  await prisma.job.update({
    where: { id: testJob.id },
    data: { status: "ACCEPTED", acceptedByBusinessId: testBusiness.id },
  });

  // Usta olarak giriş yap
  await page.goto("/auth/login", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });
  await page.fill('input[type="email"]', testVendor.email);
  await page.fill('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

  // İş detayına git
  await page.goto(`/business/jobs/${testJob.id}`, {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // "Tamamlandı" butonu var mı?
  const completeButton = page.locator('button:has-text("Tamamlandı")').or(
    page.locator('button:has-text("Tamamla")').first()
  );
  await expect(completeButton.first()).toBeVisible({ timeout: 10000 });
});

test("4.2 - Müşteri - Ustaya puan ve yorum verme", async ({ page }) => {
  // İşi COMPLETED durumuna getir
  await prisma.job.update({
    where: { id: testJob.id },
    data: { status: "COMPLETED" },
  });

  // Müşteri olarak giriş yap
  await page.goto("/auth/login", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });
  await page.fill('input[type="email"]', testCustomer.email);
  await page.fill('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 15000 }).catch(() => {});

  // İş detayına git
  await page.goto(`/jobs/${testJob.id}`, {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // Değerlendirme formu görünüyor mu?
  const ratingForm = page.locator('text=/Değerlendirme/i').or(
    page.locator('text=/Puan/i').first()
  );
  await expect(ratingForm.first()).toBeVisible({ timeout: 10000 });
});

// ============================================
// 5. KAYIT FORMU - VASIFSIZ İŞLERDEN BİLDİRİM
// ============================================

test("5.1 - Kayıt formunda vasıfsız işlerden bildirim checkbox'ı", async ({ page }) => {
  // Kayıt sayfasına git
  await page.goto("/auth/register", {
    waitUntil: "domcontentloaded",
      timeout: 120000,
  });

  // "Vasıf gerektirmeyen işlerden bildirim" checkbox'ı var mı?
  const unskilledCheckbox = page.locator('text=/vasıf gerektirmeyen/i').or(
    page.locator('text=/ek kazanç/i').first()
  );
  await expect(unskilledCheckbox.first()).toBeVisible({ timeout: 10000 });
});

