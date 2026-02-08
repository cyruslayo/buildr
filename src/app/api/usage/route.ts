/**
 * Usage API Route
 * 
 * GET /api/usage
 * Returns current user's usage statistics for the billing period.
 */

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { getUsage, type UsageTier } from '@/lib/usage';

export async function GET() {
  try {
    // Get authenticated session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // TODO: Get user's actual tier from database
    // For now, default to 'free' tier
    const tier: UsageTier = 'free';
    
    const usage = await getUsage(session.user.id, tier);

    return NextResponse.json(usage);
  } catch (error) {
    console.error('Usage API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve usage information' },
      { status: 500 }
    );
  }
}
