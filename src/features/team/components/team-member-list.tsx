import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';
import { TeamMemberListClient } from './team-member-list-client';

/**
 * Server component wrapper that fetches team members and passes to client component.
 * Implements "Lagos Luxury" with depth and "Asymmetry" in layout.
 */
export async function TeamMemberList() {
  const session = await auth();
  if (!session?.user?.id) return null;

  // Fetch the user's teamId and role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { teamId: true, role: true },
  });

  if (!user?.teamId) {
    return (
      <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
        <p className="text-slate-500 font-medium">No team found. Create an agency profile to start collaborating.</p>
      </div>
    );
  }

  // Fetch all members of this team
  const members = await prisma.user.findMany({
    where: { teamId: user.teamId },
    orderBy: { role: 'desc' }, // Admins/Agents first
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });

  const isAdmin = user.role === 'ADMIN' || user.role === 'AGENT';

  return (
    <TeamMemberListClient 
      members={members} 
      currentUserId={session.user.id}
      isAdmin={isAdmin}
    />
  );
}
