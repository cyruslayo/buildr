/**
 * POST /api/leads
 * Captures email leads for marketing
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const LeadSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('landing'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = LeadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email, source } = validation.data;

    // Upsert - if email exists, just return success (don't error)
    await prisma.lead.upsert({
      where: { email },
      update: {}, // No update needed if exists
      create: { email, source },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    );
  }
}
