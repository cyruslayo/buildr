/**
 * @jest-environment node
 */
import { POST } from '@/app/api/payments/subscribe/route';
import { NextRequest } from 'next/server';

// Mock fetch for Paystack API calls
const mockPaystackResponse = {
  status: true,
  message: 'Authorization URL created',
  data: {
    authorization_url: 'https://checkout.paystack.com/test_auth_url',
    access_code: 'test_access_code',
    reference: 'test_reference_123',
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockPaystackResponse),
  })
) as jest.Mock;

function createRequest(body: object): NextRequest {
  return new NextRequest('http://localhost:3000/api/payments/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/payments/subscribe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_xxx';
  });

  it('returns Paystack payment URL for valid request', async () => {
    const req = createRequest({
      email: 'agent@realestate.ng',
      plan: 'pro',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.authorization_url).toContain('paystack.com');
    expect(data.reference).toBeDefined();
  });

  it('validates plan selection - rejects invalid plan', async () => {
    const req = createRequest({
      email: 'agent@realestate.ng',
      plan: 'invalid_plan',
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('validates email format', async () => {
    const req = createRequest({
      email: 'not-an-email',
      plan: 'basic',
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('supports all Nigerian pricing tiers', async () => {
    const plans = ['basic', 'pro', 'enterprise'];

    for (const plan of plans) {
      const req = createRequest({
        email: 'test@example.com',
        plan,
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
    }
  });

  it('returns error when PAYSTACK_SECRET_KEY is missing', async () => {
    delete process.env.PAYSTACK_SECRET_KEY;

    const req = createRequest({
      email: 'agent@realestate.ng',
      plan: 'pro',
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const data = await res.json();
    expect(data.error).toContain('configuration');
  });

  it('handles Paystack API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ status: false, message: 'Invalid key' }),
    });

    const req = createRequest({
      email: 'agent@realestate.ng',
      plan: 'pro',
    });

    const res = await POST(req);
    expect(res.status).toBe(502);

    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('sends correct amount to Paystack based on plan', async () => {
    const req = createRequest({
      email: 'agent@realestate.ng',
      plan: 'pro',
    });

    await POST(req);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.paystack.co/transaction/initialize',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"amount":1500000'), // ₦15,000 in kobo
      })
    );
  });
});
