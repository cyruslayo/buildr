/**
 * Preview Page - Shows generated project preview
 * 
 * This is a Server Component that fetches the project
 * and renders it with the selected template.
 */

import { notFound } from 'next/navigation';
import { getProjectWithData } from '@/lib/templates/generator';
import { getTemplateComponent } from '@/components/templates/registry';
import Link from 'next/link';
import { ArrowLeft, Download, Pencil } from 'lucide-react';

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  
  // Fetch project data
  const project = await getProjectWithData(id);
  
  if (!project) {
    notFound();
  }
  
  // Get the template component
  const TemplateComponent = getTemplateComponent('tmpl_listing_luxury_ng');
  
  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Template not found</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Preview Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-slate-600">|</span>
            <h1 className="text-white font-medium">{project.name}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href={`/api/export?projectId=${project.id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </Link>
            <Link
              href={`/edit/${project.id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
          </div>
        </div>
      </header>
      
      {/* Preview Container */}
      <main className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Device Frame */}
          <div className="bg-slate-800 rounded-t-2xl p-2">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
                preview.buildr.ng/{project.id}
              </div>
            </div>
          </div>
          
          {/* Template Content */}
          <div className="bg-white rounded-b-2xl overflow-hidden shadow-2xl">
            <TemplateComponent data={project.propertyData} />
          </div>
        </div>
        
        {/* Actions Below */}
        <div className="max-w-5xl mx-auto mt-8 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Your landing page is ready! Export it as HTML or share the preview link.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={`/api/export?projectId=${project.id}`}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Download HTML
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
