/**
 * Credentials authentication logic
 * @fileoverview User authentication with email/password
 */
import { verifyPassword } from './password';
import { prisma } from '@/lib/db';

interface Credentials {
  email: string;
  password: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string | null;
}

/**
 * Authenticate user with email and password
 * @param credentials - Email and password
 * @returns User object if valid, null otherwise
 */
export async function authenticateUser(
  credentials: Credentials
): Promise<AuthUser | null> {
  const { email, password } = credentials;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
  });

  if (!user || !user.password) {
    return null;
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
