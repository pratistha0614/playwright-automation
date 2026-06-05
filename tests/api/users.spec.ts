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

test.describe('ReqRes API - Users CRUD', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ request }) => {
    await delay(1000);
    const limited = await checkRateLimit(request);
    test.skip(limited, 'Rate limit reached — rerun after midnight UTC');
  });

  test('TC023 - GET /users returns 200 and user list', async ({ request }) => {
    const res = await request.get(`${API}/users?page=1`, { headers: HEADERS });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('id');
    expect(body.data[0]).toHaveProperty('email');
  });

  test('TC024 - GET /users/2 returns single user with correct id', async ({ request }) => {
    const res = await request.get(`${API}/users/2`, { headers: HEADERS });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty('first_name');
    expect(body.data).toHaveProperty('last_name');
    expect(body.data).toHaveProperty('email');
  });

  test('TC025 - POST /users creates user and returns 201', async ({ request }) => {
    const res = await request.post(`${API}/users`, {
      headers: { ...HEADERS, 'Content-Type': 'application/json' },
      data: { name: 'Ali QA', job: 'Test Engineer' }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.name).toBe('Ali QA');
    expect(body.job).toBe('Test Engineer');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

  test('TC026 - PUT /users/2 updates user and returns updatedAt', async ({ request }) => {
    const res = await request.put(`${API}/users/2`, {
      headers: HEADERS,
      data: { name: 'Updated Ali', job: 'Senior QA' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('Updated Ali');
    expect(body).toHaveProperty('updatedAt');
  });

  test('TC027 - DELETE /users/2 returns 204 no content', async ({ request }) => {
    const res = await request.delete(`${API}/users/2`, { headers: HEADERS });
    expect(res.status()).toBe(204);
  });

  test('TC028 - Pagination returns different users on page 1 vs page 2', async ({ request }) => {
    const res1  = await request.get(`${API}/users?page=1`, { headers: HEADERS });
    const page1 = await res1.json();
    await delay(1000);
    const res2  = await request.get(`${API}/users?page=2`, { headers: HEADERS });
    const page2 = await res2.json();
    expect(Array.isArray(page1.data)).toBe(true);
    expect(Array.isArray(page2.data)).toBe(true);
    expect(page1.data[0].id).not.toBe(page2.data[0].id);
  });

});