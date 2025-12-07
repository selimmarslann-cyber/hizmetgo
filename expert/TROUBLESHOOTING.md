# EXPERT SYSTEM Troubleshooting Guide

## Common Issues and Solutions

### 1. Test Timeouts

**Problem**: Tests timeout before completing

**Solutions**:
- Increase timeout in `playwright.config.ts` (already set to 60s)
- Check if dev server is running: `npm run dev`
- Verify server is accessible at `http://localhost:3000`
- Check network connectivity

### 2. Element Not Found

**Problem**: Selectors can't find elements on the page

**Solutions**:
- Update selectors to match current UI
- Use Playwright's codegen: `npx playwright codegen http://localhost:3000`
- Check if page is fully loaded: `await page.waitForLoadState('networkidle')`
- Verify route exists and is accessible

### 3. API Health Check Failures

**Problem**: API endpoints return 500 errors

**Solutions**:
- Check if database is connected
- Verify environment variables are set
- Check API route logs for errors
- Some endpoints require authentication (401 is expected)

### 4. JSON Parse Errors

**Problem**: `Unexpected end of JSON input`

**Solutions**:
- Ensure request body is valid JSON
- Check Content-Type header is `application/json`
- Verify request body is not empty

### 5. Sentry Warnings

**Problem**: Sentry configuration warnings

**Solutions**:
- Use `instrumentation.ts` for server/edge (already configured)
- Use `instrumentation-client.ts` for client (already configured)
- Delete old `sentry.*.config.ts` files (already done)

### 6. Slow Test Execution

**Problem**: Tests take too long to run

**Solutions**:
- Reduce number of workers: `workers: 1` in config
- Skip non-critical tests
- Use `test.skip()` for unimplemented features
- Optimize test selectors

## Test-Specific Issues

### Login Tests
- Ensure `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` are set
- Verify login page route is `/auth/login`
- Check if login form selectors match current UI

### Register Tests
- Verify registration route is `/auth/register`
- Check if form has all required fields
- Ensure email validation works

### Payment Tests
- Requires authenticated user
- May need test payment provider credentials
- Check if payment routes exist

### Notification Tests
- Requires authenticated user
- May need push token setup
- Verify notification routes exist

## Running Individual Tests

```bash
# Run only login tests
npx playwright test expert/login.spec.ts

# Run only API health checks
npx playwright test expert/api-health.spec.ts

# Run with UI for debugging
npx playwright test expert/login.spec.ts --ui
```

## Viewing Test Results

```bash
# View HTML report
npx playwright show-report expert-report

# View trace for failed test
npx playwright show-trace test-results/[test-name]/trace.zip
```

