'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useWizardStore } from '@/features/wizard/store/wizard-store';
import { ImageGridPicker } from '../image-grid-picker';
import { getCloudinarySignature } from '../../actions/get-cloudinary-signature';
import { PROPERTY_PHOTO_TRANSFORMATION } from '../../constants/upload';
import { toast } from 'sonner';

interface UploadingFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

/**
 * PhotoStep: Orchestrates the image upload flow.
 * Logic:
 * 1. User selects files.
 * 2. Component generates optimistic previews (URL.createObjectURL).
 * 3. component requests Cloudinary signatures via Server Action.
 * 4. Parallel uploads via XHR to track progress.
 * 5. Update Wizard Store on success.
 */
export const PhotoStep = () => {
  const { propertyData, updatePropertyData } = useWizardStore();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  // Memory Leak Fix: Cleanup previews on unmount
  useEffect(() => {
    return () => {
      uploadingFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadingFiles]);

  const handleUpload = useCallback(async (files: File[]) => {
    // 1. Create optimistic placeholders
    const newUploads = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' as const,
    }));

    setUploadingFiles((prev) => [...prev, ...newUploads]);

    // 2. Process each upload
    newUploads.forEach(async (upload) => {
      try {
        // A. Get Signature
        const signatureResponse = await getCloudinarySignature();
        if (!signatureResponse.success) throw new Error('Signature failed');

        const { signature, timestamp, apiKey, cloudName, folder, transformation } = signatureResponse;

        // B. Upload via XHR for progress tracking (3G optimized)
        const formData = new FormData();
        formData.append('file', upload.file);
        formData.append('signature', signature!);
        formData.append('timestamp', timestamp!.toString());
        formData.append('api_key', apiKey!);
        formData.append('folder', folder!);
        if (transformation) {
          formData.append('transformation', transformation);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

        setUploadingFiles((prev) => 
          prev.map((f) => f.id === upload.id ? { ...f, status: 'uploading', progress: 0 } : f)
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setUploadingFiles((prev) => 
              prev.map((f) => f.id === upload.id ? { ...f, progress: percent } : f)
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const secureUrl = response.secure_url;

            // Update Global Store using latest state to avoid stale closures
            const currentImages = (useWizardStore.getState().propertyData.images as string[]) || [];
            updatePropertyData({
              images: [...currentImages, secureUrl]
            });

            // Remove from local uploading state
            setUploadingFiles((prev) => prev.filter((f) => f.id !== upload.id));
            URL.revokeObjectURL(upload.preview);
            
            // Success Feedback
            toast.success('Photo Uploaded', {
              description: `"${upload.file.name}" is now part of your listing.`,
            });
          } else {
            console.error('Upload failed with status:', xhr.status);
            setUploadingFiles((prev) => 
              prev.map((f) => f.id === upload.id ? { ...f, status: 'error' } : f)
            );
            URL.revokeObjectURL(upload.preview);
            toast.error('Upload Failed', {
              description: `Could not upload "${upload.file.name}". Please try again.`,
            });
          }
        };

        xhr.onerror = () => {
          setUploadingFiles((prev) => 
            prev.map((f) => f.id === upload.id ? { ...f, status: 'error' } : f)
          );
          URL.revokeObjectURL(upload.preview);
          toast.error('Connection Error', {
            description: 'Please check your internet connection.',
          });
        };

        xhr.send(formData);

      } catch (error) {
        console.error('Upload Error for file', upload.file.name, error);
        setUploadingFiles((prev) => 
          prev.map((f) => f.id === upload.id ? { ...f, status: 'error' } : f)
        );
        URL.revokeObjectURL(upload.preview);
        toast.error('System Error', {
          description: error instanceof Error ? error.message : 'An unexpected error occurred.',
        });
      }
    });
  }, [updatePropertyData]);

  const handleRemove = (urlToRemove: string) => {
    const currentImages = (propertyData.images as string[]) || [];
    updatePropertyData({
      images: currentImages.filter((url) => url !== urlToRemove)
    });
  };

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upload Photos</h2>
        <p className="text-muted-foreground text-lg">
          Add the best shots of your property to attract high-value buyers.
        </p>
      </div>

      <ImageGridPicker 
        images={(propertyData.images as string[]) || []}
        uploadingFiles={uploadingFiles}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </div>
  );
};
