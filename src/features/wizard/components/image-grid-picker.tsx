'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { MAX_FILE_SIZE_BYTE } from '../constants/upload';

interface UploadingFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

interface ImageGridPickerProps {
  images: string[];
  onUpload: (files: File[]) => void;
  onRemove: (url: string) => void;
  uploadingFiles?: UploadingFile[];
}

/**
 * ImageGridPicker: An asymmetric, high-performance image picker
 * Designed for the Nigerian market (L Lagos Luxury).
 * Implements optimistic previews and real-time progress.
 */
export const ImageGridPicker: React.FC<ImageGridPickerProps> = ({
  images,
  onUpload,
  onRemove,
  uploadingFiles = [],
}) => {
  const [error, setError] = useState<string | null>(null);

  const maxMB = Math.round(MAX_FILE_SIZE_BYTE / (1024 * 1024));

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      const isTooLarge = fileRejections.some(rejection => 
        rejection.errors.some((e: any) => e.code === 'file-too-large')
      );
      
      if (isTooLarge) {
        setError(`Image too large. Please use a file under ${maxMB}MB.`);
      } else {
        setError("Invalid file type. Please use JPEG, PNG or WebP.");
      }
      return;
    }

    setError(null);
    onUpload(acceptedFiles);
  }, [onUpload, maxMB]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: MAX_FILE_SIZE_BYTE,
  });

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="alert-error"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <Alert variant="destructive" className="relative pr-12">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
              <button 
                onClick={() => setError(null)}
                className="absolute right-3 top-3 p-1 rounded-md hover:bg-destructive/10 transition-colors"
                aria-label="Dismiss error"
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asymmetric Grid Ratios: col-span-8 + col-span-4 (2/3) Pattern */}
      <div className="grid grid-cols-12 gap-4">
        {/* Main Upload Dropzone (Asymmetric: col-span-12 on mobile, col-span-5 on desktop) */}
        <div 
          {...getRootProps()} 
          className={cn(
            "col-span-12 md:col-span-5 aspect-[4/3] min-h-[300px]",
            "border-2 border-dashed rounded-2xl transition-all duration-300",
            "flex flex-col items-center justify-center cursor-pointer",
            "bg-muted/30 backdrop-blur-sm",
            isDragActive ? "border-primary bg-primary/5 scale-[0.98]" : "border-muted-foreground/20 hover:border-primary/50"
          )}
        >
          <input {...getInputProps({ 'aria-label': 'upload' })} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-6"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Drop your photos here</h3>
            <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">
              Drag & drop or click to browse. Supports high-res JPEG/PNG up to {maxMB}MB.
            </p>
          </motion.div>
        </div>

        {/* Previews Grid (Asymmetric: col-span-12 on mobile, col-span-7 on desktop) */}
        <div className="col-span-12 md:col-span-7">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Uploading Files (Optimistic Previews) */}
            <AnimatePresence>
              {uploadingFiles.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-muted ring-2 ring-primary/20 ring-offset-2"
                >
                  <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                    {file.status === 'pending' && <Loader2 className="w-6 h-6 text-white animate-spin" />}
                    {file.status === 'uploading' && (
                      <div className="w-full space-y-2">
                        <Progress value={file.progress} className="h-1 bg-white/20" />
                        <span className="text-[10px] text-white font-medium text-center block">
                          Syncing... {Math.round(file.progress)}%
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Already Uploaded Images */}
              {images.map((url, index) => (
                <motion.div
                  key={url}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-muted group"
                >
                  <img src={url} alt={`Property ${index}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => onRemove(url)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
                    aria-label={`Remove ${index === 0 ? 'Cover' : ''} Photo ${index + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 text-white text-[10px] font-bold rounded shadow-sm">
                      Cover
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {images.length === 0 && uploadingFiles.length === 0 && (
              <div className="col-span-full aspect-[4/3] flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-2xl bg-muted/10 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm italic">Images will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
