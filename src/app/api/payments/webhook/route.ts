/**
 * Paystack Webhook Handler
 * 
 * POST /api/payments/webhook
 * Handles Paystack webhook events with HMAC signature verification.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { PaystackWebhookEventSchema, formatNaira } from '@/lib/payments/paystack';

/**
 * Verify Paystack webhook signature using HMAC SHA512
 */
function verifySignature(payload: string, signature: string, secretKey: string): boolean {
  const hash = crypto
    .createHmac('sha512', secretKey)
    .update(payload)
    .digest('hex');

  return hash === signature;
}

export async function POST(request: NextRequest) {
  try {
    // Check configuration
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error('Webhook error: PAYSTACK_SECRET_KEY is not set');
      return NextResponse.json(
        { error: 'Payment configuration error.' },
        { status: 500 }
      );
    }

    // Get signature from headers
    const signature = request.headers.get('x-paystack-signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 401 }
      );
    }

    // Get raw body for signature verification
    const rawBody = await request.text();

    // Verify signature
    if (!verifySignature(rawBody, signature, secretKey)) {
      console.error('Webhook error: Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse and validate event
    const body = JSON.parse(rawBody);
    const parseResult = PaystackWebhookEventSchema.safeParse(body);

    if (!parseResult.success) {
      console.error('Webhook error: Invalid event format', parseResult.error);
      return NextResponse.json(
        { error: 'Invalid event format' },
        { status: 400 }
      );
    }

    const event = parseResult.data;

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(event.data);
        break;

      case 'subscription.create':
        await handleSubscriptionCreate(event.data);
        break;

      case 'subscription.disable':
        await handleSubscriptionDisable(event.data);
        break;

      default:
        console.log(`Unhandled webhook event: ${event.event}`);
    }

    return NextResponse.json({
      received: true,
      event: event.event,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful charge (payment received)
 */
async function handleChargeSuccess(data: {
  reference?: string;
  amount?: number;
  customer?: { email: string; id?: number };
  metadata?: Record<string, unknown>;
}) {
  console.log('Payment received:', {
    reference: data.reference,
    amount: data.amount ? formatNaira(data.amount) : 'N/A',
    email: data.customer?.email,
    metadata: data.metadata,
  });

  // TODO: In production, update user subscription status in database
  // await prisma.subscription.update({
  //   where: { reference: data.reference },
  //   data: { status: 'active', activatedAt: new Date() },
  // });
}

/**
 * Handle subscription creation
 */
async function handleSubscriptionCreate(data: {
  customer?: { email: string; id?: number };
  status?: string;
}) {
  console.log('Subscription created:', {
    email: data.customer?.email,
    status: data.status,
  });

  // TODO: In production, create subscription record
  // await prisma.subscription.create({ ... });
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDisable(data: {
  customer?: { email: string; id?: number };
  status?: string;
}) {
  console.log('Subscription disabled:', {
    email: data.customer?.email,
    status: data.status,
  });

  // TODO: In production, update subscription status
  // await prisma.subscription.update({ ... status: 'cancelled' });
}
