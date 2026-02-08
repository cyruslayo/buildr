/**
 * Registration API endpoint
 * @fileoverview Handles POST requests for user registration with NDPR consent (NFR6)
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { registerUser } from '@/lib/auth/register';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  ndprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to be contacted to create an account.',
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { name, email, password, ndprConsent } = validation.data;

    // Extract IP and User-Agent for NDPR audit log (NFR6)
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Register user with consent info
    const result = await registerUser({ 
      name, 
      email, 
      password, 
      ndprConsent,
      ipAddress,
      userAgent,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 409 } // Conflict for duplicate email
      );
    }

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: { id: result.user?.id, email: result.user?.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
