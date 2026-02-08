/**
 * Verification Settings Page
 * @fileoverview KYC document upload for agent verification
 * 
 * Server Component - fetches user's KYC status
 */
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { KYCUploadForm } from '@/features/kyc/components/kyc-upload-form';
import { ShieldCheck, FileCheck, Clock, XCircle } from 'lucide-react';

export default async function VerificationPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { kycStatus: true, kycDocument: true },
  });

  const kycStatus = user?.kycStatus || 'NONE';

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl text-slate-900 mb-2">
            Get Verified
          </h1>
          <p className="text-slate-500">
            Upload your RC Number or NIN document to unlock the Verified badge
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-8">
          <div className="flex items-center gap-4">
            <StatusIcon status={kycStatus} />
            <div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-mono">
                Verification Status
              </div>
              <div 
                data-testid="kyc-status" 
                className="font-display text-xl text-slate-900"
              >
                {getStatusLabel(kycStatus)}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div 
          data-testid="kyc-upload-section"
          className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8"
        >
          <h2 className="font-display text-xl text-slate-900 mb-2">
            Upload Document
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Accepted formats: PDF, JPG, PNG (Max 5MB)
          </p>
          
          <KYCUploadForm currentStatus={kycStatus} />
        </div>

        {/* Trust Info */}
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>Your documents are encrypted and stored securely.</p>
          <p>Verification typically takes 24-48 hours.</p>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'VERIFIED':
      return (
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-emerald-600" />
        </div>
      );
    case 'PENDING':
      return (
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
          <Clock className="w-6 h-6 text-amber-600" />
        </div>
      );
    case 'REJECTED':
      return (
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="w-6 h-6 text-red-600" />
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-slate-400" />
        </div>
      );
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'VERIFIED':
      return 'Verified ✓';
    case 'PENDING':
      return 'Pending Review';
    case 'REJECTED':
      return 'Rejected';
    default:
      return 'Not Verified';
  }
}
