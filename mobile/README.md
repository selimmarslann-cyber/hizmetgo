# Hizmetgo Mobile App

Expo + React Native mobile application for Hizmetgo platform.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

- Copy `.env.example` to `.env`
- Set `EXPO_PUBLIC_API_BASE_URL` (dev: `http://localhost:3000`, prod: `https://hizmetgo.app`)

3. Start development server:

```bash
npm start
```

## Build

### Development Build

```bash
eas build --profile development --platform android
eas build --profile development --platform ios
```

### Preview Build (Internal Testing)

```bash
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

### Production Build (Store)

```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

## Submit to Stores

### Android (Google Play)

```bash
eas submit --platform android --profile production
```

### iOS (App Store)

```bash
eas submit --platform ios --profile production
```

## OTA Updates

Updates are automatically checked on app load. To manually trigger:

```bash
eas update --branch production --message "Update description"
```

## Environment Variables

- `EXPO_PUBLIC_API_BASE_URL`: Backend API URL
- `EXPO_PUBLIC_SENTRY_DSN`: Sentry DSN (production only)

## Assets

Required assets (place in `./assets/`):

- `icon.png` (1024x1024)
- `splash.png` (1284x2778 recommended)
- `adaptive-icon.png` (1024x1024, with padding)
- `notification-icon.png` (96x96)
- `favicon.png` (48x48)

## EAS Project ID

After creating EAS project:

1. Run `eas init`
2. Update `app.json` with project ID:

```json
{
  "extra": {
    "eas": {
      "projectId": "YOUR_PROJECT_ID"
    }
  }
}
```
