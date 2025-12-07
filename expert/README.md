# EXPERT SYSTEM - End-to-End Test Suite

Comprehensive automated testing system for critical application flows.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

**Note**: Test users are automatically created and cleaned up. No manual user setup required!

## Running Tests

### Run all tests:
```bash
npm run expert
```

### Run with UI:
```bash
npm run expert:ui
```

### Generate HTML report:
```bash
npm run expert:report
```

## Test Files

- **login.spec.ts** - User login flow
- **register.spec.ts** - User registration flow
- **payment.spec.ts** - Payment processing flow
- **publish.spec.ts** - Listing publish flow
- **key-match.spec.ts** - Code/key verification flow
- **notification.spec.ts** - Notification system tests
- **api-health.spec.ts** - API endpoint health checks

## Event Tracking

The system uses `lib/track.ts` to track user interactions and system events. Events are logged for:
- Button clicks
- Form submissions
- Success/failure states
- API calls

## Reports

After running tests, reports are generated in:
- `expert-report/results.json` - JSON format
- `expert-report/results.txt` - Human-readable format
- `expert-report/index.html` - HTML report with screenshots and traces

## Auto-Fix

When tests fail, the system analyzes failures and provides suggestions for fixes. Review the suggestions in the console output.

## Troubleshooting

1. **Tests timeout**: Increase timeout in `playwright.config.ts` or check if server is running
2. **Authentication errors**: Set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env.local`
3. **Element not found**: Update selectors in test files to match current UI
4. **Network errors**: Ensure dev server is running on the correct port

