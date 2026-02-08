/**
 * Template Library Page
 * Server Component that fetches templates and lock status,
 * then renders the TemplateLibrary client component.
 */

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { TEMPLATE_REGISTRY } from '@/lib/templates/registry';
import { TemplateLibrary } from '@/features/team/components/template-library';

export default async function TemplatesPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Fetch user's team and role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { teamId: true, role: true },
  });

  if (!user?.teamId) {
    return (
      <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
        <p className="text-slate-500 font-medium">
          No team found. Create an agency profile to access templates.
        </p>
      </div>
    );
  }

  // Fetch locked templates for this team
  const lockedTemplates = await prisma.lockedTemplate.findMany({
    where: { teamId: user.teamId },
    select: { templateId: true },
  });

  const lockedTemplateIds = lockedTemplates.map(lt => lt.templateId);
  const isAdmin = user.role === 'ADMIN' || user.role === 'AGENT';

  return (
    <TemplateLibrary 
      templates={TEMPLATE_REGISTRY} 
      lockedTemplateIds={lockedTemplateIds}
      isAdmin={isAdmin}
    />
  );
}
