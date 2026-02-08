/**
 * KYC Upload Form Component
 * @fileoverview Client component for KYC document upload with validation
 * 
 * "use client" - Uses file input, state, and form submission
 */
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Allowed file types and max size
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface KYCUploadFormProps {
  currentStatus: string;
}

export function KYCUploadForm({ currentStatus }: KYCUploadFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (selectedFile: File): string | null => {
    // Check file type
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      return 'Invalid file type. Please upload a PDF, JPG, or PNG file.';
    }
    
    // Check file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      return 'File is too large. Please upload a file under 5MB.';
    }
    
    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);
    
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Auto-upload valid files immediately
    setFile(selectedFile);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/kyc/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed. Please try again.');
      }

      setSuccess('Document submitted for review. Your verification status is now pending.');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Refresh the page to show updated status
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/kyc/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed. Please try again.');
      }

      setSuccess('Document submitted for review. Your verification status is now pending.');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Refresh the page to show updated status
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // If already verified, show status
  if (currentStatus === 'VERIFIED') {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 mb-4" />
        <p className="text-slate-600">Your account is already verified!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Input Area */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          data-testid="kyc-file-input"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
          <Upload className="w-10 h-10 mx-auto text-slate-400 mb-4" />
          {file ? (
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <FileText className="w-5 h-5" />
              <span className="font-medium">{file.name}</span>
            </div>
          ) : (
            <>
              <p className="text-slate-600 font-medium">
                Click or drag to upload
              </p>
              <p className="text-slate-400 text-sm mt-1">
                PDF, JPG, or PNG up to 5MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div 
          data-testid="upload-error"
          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div 
          data-testid="upload-success"
          className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-600">{success}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!file || isUploading}
        className="w-full bg-emerald-600 hover:bg-emerald-700"
      >
        {isUploading ? 'Uploading...' : 'Submit for Verification'}
      </Button>

      {/* Pending Status Note */}
      {currentStatus === 'PENDING' && (
        <p className="text-center text-sm text-amber-600">
          You already have a document pending review. Uploading a new document will replace it.
        </p>
      )}
    </form>
  );
}
