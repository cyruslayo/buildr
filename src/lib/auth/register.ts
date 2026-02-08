/**
 * User registration service
 * @fileoverview Handles user registration with validation and NDPR consent (NFR6)
 */
import { prisma } from '@/lib/db';
import { hashPassword } from './password';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  ndprConsent?: boolean;
  ipAddress?: string;
  userAgent?: string;
}

interface RegisterResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string | null;
  };
  error?: string;
}

/**
 * Register a new user
 * @param input - User registration data including NDPR consent
 * @returns Registration result with user or error
 */
export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const { name, email, password, ndprConsent, ipAddress, userAgent } = input;
  const normalizedEmail = email.toLowerCase().trim();

  // Check for existing user
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return {
      success: false,
      error: 'A user with this email already exists',
    };
  }

  // Hash password
  const hashedPassword = await hashPassword(password);
  const now = new Date();

  // Create user with NDPR consent in a transaction (NFR6)
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        ndprConsentAt: ndprConsent ? now : null, // Store consent timestamp
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Create NDPR consent audit log if consent was given
    if (ndprConsent) {
      await tx.consentLog.create({
        data: {
          userId: newUser.id,
          consentType: 'NDPR_CONTACT',
          ipAddress: ipAddress || null,
          userAgent: userAgent || null,
          granted: true,
        },
      });
    }

    return newUser;
  });

  return {
    success: true,
    user,
  };
}
