import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/auth';

/**
 * Fetches all properties belonging to the current user's team.
 * Enforces strict tenant isolation as per NFR4 and 200ms skeleton delay (AC2).
 */
export async function getProperties() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Artificial delay to satisfy AC2 (200ms minimum skeleton loading)
  await new Promise(resolve => setTimeout(resolve, 200));

  // Use teamId from session if available
  const teamId = (session.user as any).teamId || null;
  const userId = session.user.id;

  return prisma.property.findMany({
    where: {
      ...(teamId ? { teamId } : { userId }),
      deletedAt: null, // Exclude soft-deleted items (Story 4.3)
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}
