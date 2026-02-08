/**
 * Paystack Subscription API Route
 * 
 * POST /api/payments/subscribe
 * Initializes a Paystack transaction for subscription payment.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  SubscribeRequestSchema,
  PRICING_TIERS,
  initializeTransaction,
  type PlanType,
} from '@/lib/payments/paystack';

export async function POST(request: NextRequest) {
  try {
    // Check configuration
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Parse JSON body with error handling
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Validate request body
    const parseResult = SubscribeRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: parseResult.error.issues.map((e: { message: string }) => e.message),
        },
        { status: 400 }
      );
    }

    const { email, plan, metadata } = parseResult.data;
    const tier = PRICING_TIERS[plan as PlanType];

    // Initialize Paystack transaction
    const result = await initializeTransaction({
      email,
      amount: tier.amount,
      metadata: {
        plan,
        plan_name: tier.name,
        ...metadata,
      },
      callback_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payments/callback`,
    });

    return NextResponse.json({
      authorization_url: result.data.authorization_url,
      access_code: result.data.access_code,
      reference: result.data.reference,
      plan: {
        name: tier.name,
        amount: tier.amountNaira,
        currency: 'NGN',
      },
    });
  } catch (error) {
    console.error('Subscription error:', error);

    // Handle Paystack API errors
    if (error instanceof Error && error.message.includes('Paystack API error')) {
      return NextResponse.json(
        { error: 'Payment gateway error. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

