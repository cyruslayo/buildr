/**
 * @jest-environment node
 */
import { POST } from '@/app/api/payments/webhook/route';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Helper to create signed webhook request
function createWebhookRequest(
  body: object,
  signature?: string
): NextRequest {
  const bodyString = JSON.stringify(body);
  const secretKey = process.env.PAYSTACK_SECRET_KEY || 'sk_test_xxx';
  
  // Generate valid signature if not provided
  const validSignature = signature || crypto
    .createHmac('sha512', secretKey)
    .update(bodyString)
    .digest('hex');

  return new NextRequest('http://localhost:3000/api/payments/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-paystack-signature': validSignature,
    },
    body: bodyString,
  });
}

describe('POST /api/payments/webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_xxx';
  });

  it('verifies Paystack signature - rejects invalid signature', async () => {
    const body = {
      event: 'charge.success',
      data: {
        reference: 'test_ref_123',
        amount: 1500000,
        customer: { email: 'agent@realestate.ng' },
      },
    };

    const req = createWebhookRequest(body, 'invalid_signature');
    const res = await POST(req);

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toContain('signature');
  });

  it('accepts valid signature', async () => {
    const body = {
      event: 'charge.success',
      data: {
        reference: 'test_ref_123',
        amount: 1500000,
        customer: { email: 'agent@realestate.ng' },
      },
    };

    const req = createWebhookRequest(body);
    const res = await POST(req);

    expect(res.status).toBe(200);
  });

  it('handles charge.success event', async () => {
    const body = {
      event: 'charge.success',
      data: {
        reference: 'buildr_123_abc',
        amount: 1500000, // ₦15,000 in kobo
        customer: { 
          email: 'agent@realestate.ng',
          id: 12345,
        },
        status: 'success',
        metadata: {
          plan: 'pro',
          plan_name: 'Pro',
        },
      },
    };

    const req = createWebhookRequest(body);
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.received).toBe(true);
    expect(data.event).toBe('charge.success');
  });

  it('handles subscription.create event', async () => {
    const body = {
      event: 'subscription.create',
      data: {
        customer: { email: 'agent@realestate.ng' },
        status: 'active',
      },
    };

    const req = createWebhookRequest(body);
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.event).toBe('subscription.create');
  });

  it('handles subscription.disable event', async () => {
    const body = {
      event: 'subscription.disable',
      data: {
        customer: { email: 'agent@realestate.ng' },
        status: 'cancelled',
      },
    };

    const req = createWebhookRequest(body);
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.event).toBe('subscription.disable');
  });

  it('returns error when PAYSTACK_SECRET_KEY is missing', async () => {
    delete process.env.PAYSTACK_SECRET_KEY;

    const body = {
      event: 'charge.success',
      data: { reference: 'test' },
    };

    const req = new NextRequest('http://localhost:3000/api/payments/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-paystack-signature': 'some_signature',
      },
      body: JSON.stringify(body),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it('logs transaction data for charge.success', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const body = {
      event: 'charge.success',
      data: {
        reference: 'buildr_123_abc',
        amount: 500000,
        customer: { email: 'agent@realestate.ng' },
      },
    };

    const req = createWebhookRequest(body);
    await POST(req);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Payment received'),
      expect.objectContaining({
        reference: 'buildr_123_abc',
        email: 'agent@realestate.ng',
      })
    );

    consoleSpy.mockRestore();
  });
});
