# Hizmetgo - Esnaf/Hizmet Süper Uygulaması

Mahalle esnafı ve hizmet sağlayıcıları ile müşterileri buluşturan platform.

## 🚀 Özellikler

- **Esnaf/Hizmet Eşleştirme**: AI destekli akıllı eşleştirme sistemi
- **Anlık İşler**: Acil ihtiyaçlar için hızlı hizmet bulma
- **Referral Sistemi**: Kullanıcıları davet ederek kazanç elde etme
- **Yorum ve Değerlendirme**: Güvenilir esnaf seçimi için yorumlar
- **Admin Paneli**: Kapsamlı yönetim ve moderasyon araçları
- **Mobil Uygulama**: React Native ile cross-platform mobil uygulama

## 📋 Gereksinimler

- Node.js 18+ 
- PostgreSQL (Supabase)
- npm veya yarn

## 🛠️ Kurulum

### 1. Repository'yi klonlayın

```bash
git clone https://github.com/selimmarslann-cyber/hizmetgo.git
cd hizmetgo
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Environment değişkenlerini ayarlayın

`.env.local` dosyası oluşturun:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hizmetgo"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# JWT
JWT_SECRET="your-jwt-secret"

# Email (Zoho SMTP)
MAIL_HOST="smtp.zoho.com"
MAIL_PORT="587"
MAIL_SECURE="false"
MAIL_USER="your-email@zoho.com"
MAIL_PASS="your-password"
MAIL_FROM="your-email@zoho.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Admin
ADMIN_USERNAME="selimarslan"
ADMIN_PASSWORD="selimarslan"
ADMIN_EMAIL="admin@hizmetgo.com"
ADMIN_NAME="Admin"

# OpenAI (Optional)
OPENAI_API_KEY="your-openai-api-key"
```

### 4. Veritabanını hazırlayın

```bash
# Prisma migration'ları çalıştır
npm run db:migrate

# Prisma client'ı generate et
npm run db:generate
```

### 5. Development server'ı başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

```
mahallem-main/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── (customer)/        # Customer routes
│   ├── (business)/        # Business routes
│   ├── (authenticated)/   # Authenticated routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and services
├── prisma/               # Database schema
├── public/               # Static files
└── mobile/               # React Native mobile app
```

## 🧪 Test

### Unit Tests

```bash
npm run test
```

### E2E Tests (Playwright)

```bash
npm run expert
```

## 🏗️ Build

Production build:

```bash
npm run build
npm start
```

## 🔒 Güvenlik

- JWT tabanlı authentication
- Rate limiting
- Input sanitization
- CSRF protection
- Security headers
- Password policy
- Audit logging

## 📚 API Dokümantasyonu

API endpoint'leri `/api` altında bulunur. Detaylı dokümantasyon için `docs/api/` klasörüne bakın.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje özel lisans altındadır.

## 📞 İletişim

Sorularınız için issue açabilir veya iletişime geçebilirsiniz.

