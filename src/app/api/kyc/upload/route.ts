/**
 * KYC Upload API Route
 * @fileoverview Handles KYC document upload for verification
 * 
 * Security: Validates file type server-side (R-004 mitigation)
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg', 
  'image/png',
];

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF, JPG, or PNG file.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File is too large. Please upload a file under 5MB.' },
        { status: 400 }
      );
    }

    // For MVP: Store file reference as a placeholder
    // In production, upload to Cloudinary or S3
    const fileName = `kyc_${session.user.id}_${Date.now()}_${file.name}`;
    
    // Update user's KYC status to pending
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        kycDocument: fileName,
        kycStatus: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully. Your verification is now pending.',
      fileName,
    });

  } catch (error) {
    console.error('KYC upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
