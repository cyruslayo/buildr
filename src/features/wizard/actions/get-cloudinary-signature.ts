'use server';

import { auth } from '@/lib/auth/auth';
import { v2 as cloudinary } from 'cloudinary';

import { PROPERTY_PHOTO_TRANSFORMATION } from '../constants/upload';

/**
 * Generates a signed Cloudinary signature for direct client-side uploads.
 * Enforces multi-tenant security by validating the user session.
 */
export async function getCloudinarySignature() {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Cloudinary configuration missing in environment variables');
    return { success: false, error: 'Cloudinary configuration missing' };
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // Multi-tenant Security: Enforce folder isolation (AC-5)
  // We use teamId if available, otherwise fallback to userId as the tenant identifier.
  const tenantId = (session.user as { teamId?: string }).teamId || session.user.id;
  const folder = `buildr/${tenantId}/listings`;

  const transformation = PROPERTY_PHOTO_TRANSFORMATION;

  const paramsToSign = {
    timestamp,
    folder,
    transformation,
  };

  try {
    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return {
      success: true,
      signature,
      timestamp,
      cloudName,
      apiKey,
      folder,
      transformation,
    };
  } catch (error) {
    console.error('Cloudinary signature error:', error);
    return { success: false, error: 'Failed to generate upload signature' };
  }
}
