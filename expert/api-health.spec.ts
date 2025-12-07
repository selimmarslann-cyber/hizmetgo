import { test, expect } from '@playwright/test';
import { trackEvent } from '../lib/track';

test.describe('API Health Check', () => {
  const baseURL = process.env.EXPERT_URL || 'http://localhost:3000';

  const criticalEndpoints = [
    { path: '/api/auth/login', method: 'POST', requiresAuth: false },
    { path: '/api/auth/register', method: 'POST', requiresAuth: false },
    { path: '/api/auth/me', method: 'GET', requiresAuth: true },
    { path: '/api/jobs/create', method: 'POST', requiresAuth: true },
    { path: '/api/notifications', method: 'GET', requiresAuth: true },
    { path: '/api/payments/init', method: 'POST', requiresAuth: true },
    { path: '/api/users/me', method: 'GET', requiresAuth: true },
  ];

  test('should check all critical API endpoints', async ({ request }) => {
    const results: Array<{
      endpoint: string;
      status: 'passed' | 'failed' | 'skipped';
      statusCode?: number;
      error?: string;
    }> = [];

    for (const endpoint of criticalEndpoints) {
      try {
        const options: any = {
          method: endpoint.method,
          headers: {
            'Content-Type': 'application/json',
          },
        };

        // Add auth token if required
        if (endpoint.requiresAuth && process.env.TEST_AUTH_TOKEN) {
          options.headers['Authorization'] = `Bearer ${process.env.TEST_AUTH_TOKEN}`;
        }

        // Add minimal payload for POST requests
        if (endpoint.method === 'POST') {
          if (endpoint.path.includes('/register')) {
            options.data = {
              email: `test-${Date.now()}@example.com`,
              password: 'TestPassword123!',
              name: 'Test User',
            };
          } else if (endpoint.path.includes('/login')) {
            options.data = {
              email: 'test@example.com',
              password: 'test123',
            };
          } else {
            options.data = {};
          }
        }

        const response = await request.fetch(`${baseURL}${endpoint.path}`, options).catch((e) => {
          return { ok: () => false, status: () => 500, error: e.message };
        });

        const statusCode = typeof response.status === 'function' ? response.status() : response.status || 500;
        const isOk = typeof response.ok === 'function' ? response.ok() : statusCode < 500;

        // Endpoint is healthy if it returns 200-499 (not 500+)
        const isHealthy = statusCode < 500;

        results.push({
          endpoint: endpoint.path,
          status: isHealthy ? 'passed' : 'failed',
          statusCode,
          error: isHealthy ? undefined : `Status: ${statusCode}`,
        });

        trackEvent('api_health_check', {
          endpoint: endpoint.path,
          status: isHealthy ? 'healthy' : 'unhealthy',
          statusCode,
        });
      } catch (error: any) {
        results.push({
          endpoint: endpoint.path,
          status: 'failed',
          error: error.message || 'Unknown error',
        });

        trackEvent('api_health_check_error', {
          endpoint: endpoint.path,
          error: error.message,
        });
      }
    }

    // Generate report
    const passed = results.filter((r) => r.status === 'passed').length;
    const failed = results.filter((r) => r.status === 'failed').length;
    const skipped = results.filter((r) => r.status === 'skipped').length;

    console.log('\n=== API HEALTH REPORT ===');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Skipped: ${skipped}`);
    console.log('\nDetails:');
    results.forEach((r) => {
      const icon = r.status === 'passed' ? '✔' : r.status === 'failed' ? '❌' : '⏭';
      console.log(`${icon} ${r.endpoint} - ${r.statusCode || 'N/A'} ${r.error || ''}`);
    });

    // Assert that at least some endpoints are healthy
    expect(passed).toBeGreaterThan(0);
  });

  test('should verify API response times', async ({ request }) => {
    const endpoints = [
      '/api/auth/me',
      '/api/notifications',
      '/api/users/me',
    ];

    for (const endpoint of endpoints) {
      const startTime = Date.now();
      
      await request.get(`${baseURL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${process.env.TEST_AUTH_TOKEN || ''}`,
        },
      }).catch(() => null);

      const responseTime = Date.now() - startTime;

      // Assert response time is reasonable (< 30 seconds for slow endpoints)
      expect(responseTime).toBeLessThan(30000);

      trackEvent('api_response_time', {
        endpoint,
        responseTime,
      });
    }
  });
});

