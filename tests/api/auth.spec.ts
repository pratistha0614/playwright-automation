import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const API     = process.env.API_BASE_URL || 'https://reqres.in/api';
const HEADERS = { 'x-api-key': process.env.REQRES_API_KEY || 'free_user_3EiaulUTNJZdpZzn8dV7SMUlU2N' };
const delay   = (ms: number) => new Promise(res => setTimeout(res, ms));

async function checkRateLimit(request: any): Promise<boolean> {
  const probe = await request.get(`${API}/users/1`, { headers: HEADERS });
  return probe.status() === 429;
}

test.describe('ReqRes API - Auth', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ request }) => {
    await delay(1000);
    const limited = await checkRateLimit(request);
    test.skip(limited, 'Rate limit reached — rerun after midnight UTC');
  });

  test('TC029 - POST /register with valid data returns token', async ({ request }) => {
    const res = await request.post(`${API}/register`, {
      headers: HEADERS,
      data: { email: 'eve.holt@reqres.in', password: 'pistol' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('id');
    expect(typeof body.token).toBe('string');
  });

  test('TC030 - POST /login with valid credentials returns token', async ({ request }) => {
    const res = await request.post(`${API}/login`, {
      headers: HEADERS,
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('token');
  });

  test('TC031 - API responds within 3 seconds', async ({ request }) => {
    const start    = Date.now();
    const res      = await request.get(`${API}/users`, { headers: HEADERS });
    const duration = Date.now() - start;
    expect(res.status()).toBe(200);
    expect(duration).toBeLessThan(3000);
  });

});