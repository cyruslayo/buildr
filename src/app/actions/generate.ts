'use server';

/**
 * Project Generation Server Action
 * 
 * Server action called when the wizard completes.
 * Generates a project and redirects to preview.
 */

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth.config';
import { generateProject, type WizardData } from '@/lib/templates/generator';

export interface GenerateActionResult {
  success: boolean;
  projectId?: string;
  previewUrl?: string;
  error?: string;
}

/**
 * Generate a project from wizard data
 * Called when user clicks "Generate" in the wizard
 */
export async function generateProjectAction(
  data: WizardData
): Promise<GenerateActionResult> {
  try {
    // 1. Verify authentication
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to generate a project',
      };
    }
    
    // 2. Generate the project
    const result = await generateProject(session.user.id, data);
    
    // 3. Return success with preview URL
    return {
      success: true,
      projectId: result.projectId,
      previewUrl: result.previewUrl,
    };
  } catch (error) {
    console.error('Failed to generate project:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate project',
    };
  }
}

/**
 * Generate and redirect to preview
 * Alternative action that directly redirects
 */
export async function generateAndRedirectAction(data: WizardData): Promise<void> {
  const result = await generateProjectAction(data);
  
  if (result.success && result.previewUrl) {
    redirect(result.previewUrl);
  }
  
  // If failed, redirect with error
  redirect(`/dashboard?error=${encodeURIComponent(result.error || 'Generation failed')}`);
}
