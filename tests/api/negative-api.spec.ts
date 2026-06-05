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

test.describe('Negative API Tests', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ request }) => {
    await delay(1000);
    const limited = await checkRateLimit(request);
    test.skip(limited, 'Rate limit reached — rerun after midnight UTC');
  });

  test('TC032 - GET non-existent user returns 404', async ({ request }) => {
    const res = await request.get(`${API}/users/999`, { headers: HEADERS });
    expect(res.status()).toBe(404);
  });

  test('TC033 - POST /register without password returns 400', async ({ request }) => {
    const res = await request.post(`${API}/register`, {
      headers: HEADERS,
      data: { email: 'sydney@fife' }
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Missing password');
  });

  test('TC034 - POST /login without password returns 400', async ({ request }) => {
    const res = await request.post(`${API}/login`, {
      headers: HEADERS,
      data: { email: 'peter@klaven' }
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Missing password');
  });

  test('TC035 - PATCH /users with empty body still returns 200', async ({ request }) => {
    const res = await request.patch(`${API}/users/2`, {
      headers: HEADERS,
      data: {}
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('updatedAt');
  });

  test('TC036 - Request with invalid API key returns 403', async ({ request }) => {
    const res = await request.get(`${API}/users`, {
      headers: { 'x-api-key': 'invalid-wrong-key-999' }
    });
    expect(res.status()).toBe(403);
  });

});