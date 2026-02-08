/**
 * Paystack Payment Integration for Nigerian Market
 * 
 * "use client" is NOT used here - this is a server-side only module
 * for handling payment processing with Paystack.
 */

import { z } from 'zod';

// Nigerian pricing tiers in Naira (stored as kobo for Paystack API)
export const PRICING_TIERS = {
  basic: {
    name: 'Basic',
    amount: 500000, // ₦5,000 in kobo
    amountNaira: 5000,
    features: ['5 pages/month', 'Basic templates', 'WhatsApp integration'],
  },
  pro: {
    name: 'Pro',
    amount: 1500000, // ₦15,000 in kobo
    amountNaira: 15000,
    features: ['25 pages/month', 'All templates', 'Priority support', 'Custom branding'],
  },
  enterprise: {
    name: 'Enterprise',
    amount: 5000000, // ₦50,000 in kobo
    amountNaira: 50000,
    features: ['Unlimited pages', 'All templates', 'Dedicated support', 'API access', 'Team accounts'],
  },
} as const;

export type PlanType = keyof typeof PRICING_TIERS;

// Zod schemas for validation
export const SubscribeRequestSchema = z.object({
  email: z.string().email('Valid email required'),
  plan: z.enum(['basic', 'pro', 'enterprise'], {
    message: 'Plan must be one of: basic, pro, enterprise',
  }),
  metadata: z.record(z.string(), z.string()).optional(),
});

export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;

export const PaystackInitResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.object({
    authorization_url: z.string().url(),
    access_code: z.string(),
    reference: z.string(),
  }),
});

export type PaystackInitResponse = z.infer<typeof PaystackInitResponseSchema>;

// Webhook event types
export const PaystackWebhookEventSchema = z.object({
  event: z.enum([
    'charge.success',
    'subscription.create',
    'subscription.disable',
    'subscription.not_renew',
    'transfer.success',
    'transfer.failed',
  ]),
  data: z.object({
    id: z.number().optional(),
    reference: z.string().optional(),
    amount: z.number().optional(),
    currency: z.string().optional(),
    customer: z.object({
      email: z.string().email(),
      id: z.number().optional(),
    }).passthrough().optional(),
    status: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }).passthrough(),
}).passthrough();

export type PaystackWebhookEvent = z.infer<typeof PaystackWebhookEventSchema>;

/**
 * Initialize a Paystack transaction
 */
export async function initializeTransaction(params: {
  email: string;
  amount: number;
  reference?: string;
  metadata?: Record<string, string>;
  callback_url?: string;
}): Promise<PaystackInitResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('Paystack configuration error: PAYSTACK_SECRET_KEY is not set');
  }

  const reference = params.reference || `buildr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      reference,
      currency: 'NGN',
      metadata: params.metadata,
      callback_url: params.callback_url,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Paystack API error: ${errorData.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return PaystackInitResponseSchema.parse(data);
}

/**
 * Verify Paystack webhook signature using HMAC SHA512
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('Paystack configuration error: PAYSTACK_SECRET_KEY is not set');
  }

  // Use Web Crypto API for HMAC verification (works in Edge runtime)
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha512', secretKey)
    .update(payload)
    .digest('hex');

  return hash === signature;
}

/**
 * Format amount in Naira for display
 */
export function formatNaira(amountInKobo: number): string {
  const naira = amountInKobo / 100;
  return `₦${naira.toLocaleString('en-NG')}`;
}
