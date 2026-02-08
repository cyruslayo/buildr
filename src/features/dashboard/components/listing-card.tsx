'use client';

/**
 * Justification: Implements Framer Motion entry animations and high-fidelity 
 * "Lagos Luxury" hover effects.
 */

import React, { useTransition } from 'react';
import Image from 'next/image';
import { Property, PropertyStatus } from '@prisma/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';
import { MapPin, Home, EyeOff, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { unpublishProperty } from '../actions/unpublish-property';
import { deletePropertyDraft } from '../actions/delete-property';
import { duplicateProperty } from '../actions/duplicate-property';
import { Copy } from 'lucide-react';

interface ListingCardProps {
  property: Property;
  isFeatured?: boolean;
}

/**
 * High-impact property card as per Lagos Luxury standards.
 * Enforces 4:3 aspect ratio and professional trust signals.
 */
export function ListingCard({ property, isFeatured = false }: ListingCardProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const isPublished = property.status === PropertyStatus.PUBLISHED;

  const handleUnpublish = () => {
    startTransition(async () => {
      try {
        await unpublishProperty(property.id);
        toast.success('Listing Unpublished', {
          description: 'The property has been moved to drafts.',
        });
        setIsOpen(false);
      } catch (error) {
        console.error('Failed to unpublish:', error);
        toast.error('Unpublish Failed', {
          description: error instanceof Error ? error.message : 'Please try again later.',
        });
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      // Optimistic Update: Hide the card immediately
      setIsDeleted(true);
      
      try {
        await deletePropertyDraft(property.id);
        toast.success('Draft Deleted', {
          description: 'The property draft has been removed.',
        });
      } catch (error) {
        console.error('Failed to delete:', error);
        // Rollback optimistic update on error
        setIsDeleted(false);
        toast.error('Delete Failed', {
          description: error instanceof Error ? error.message : 'Please try again later.',
        });
      }
    });
  };

  const handleDuplicate = () => {
    startTransition(async () => {
      try {
        const result = await duplicateProperty(property.id);
        if (result.success) {
          toast.success('Listing Duplicated', {
            description: 'A new draft has been created.',
          });
        }
      } catch (error) {
        console.error('Failed to duplicate:', error);
        toast.error('Duplication Failed', {
          description: error instanceof Error ? error.message : 'Please try again later.',
        });
      }
    });
  };
  
  // Format price in Naira
  const formattedPrice = property.price 
    ? new Intl.NumberFormat('en-NG', { 
        style: 'currency', 
        currency: 'NGN', 
        maximumFractionDigits: 0 
      }).format(property.price)
    : 'Price on Request';

  // If optimistically deleted, the AnimatePresence below will handle the exit animation
  
  return (
    <AnimatePresence>
      {!isDeleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}
          layout // Smooth layout shifts
          data-testid={`listing-card-${property.id}`}
        >
          <Card className={`
            overflow-hidden border-none shadow-premium hover:shadow-premium-hover transition-all duration-300
            ${isFeatured ? 'lg:flex lg:h-full lg:min-h-[400px]' : ''}
          `}>
        <div className={`
          relative aspect-[4/3] bg-slate-100 flex-shrink-0
          ${isFeatured ? 'lg:w-3/5 lg:aspect-auto' : 'w-full'}
        `}>
          {/* Main Image - Using a fallback placeholder if no image exists yet */}
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <Home className="h-12 w-12 opacity-20" />
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant={isPublished ? 'default' : 'secondary'}
              className={`
                px-3 py-1 text-xs font-bold uppercase tracking-wider border
                shadow-[0_2px_10px_-3px_rgba(0,0,0,0.2)]
                ${isPublished 
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white border-emerald-300' 
                  : 'bg-gradient-to-br from-slate-100 to-slate-300 text-slate-700 border-slate-400'}
              `}
            >
              {property.status}
            </Badge>
          </div>
        </div>

        <div className={`flex flex-col flex-1 justify-between ${isFeatured ? 'lg:p-8' : ''}`}>
          <CardContent className={`p-4 md:p-6 ${isFeatured ? 'lg:p-0' : ''}`}>
          <div className="flex flex-col gap-2">
            <h3 className="text-[clamp(1.125rem,4vw,1.25rem)] font-bold text-slate-900 truncate leading-tight">
              {property.title || 'Untitled Property'}
            </h3>
            
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{property.location || 'Location not set'}</span>
            </div>

            <div className="flex justify-between items-end mt-2">
              <div className="text-[clamp(1.25rem,5vw,1.75rem)] font-black text-primary tracking-tight leading-none">
                {formattedPrice}
              </div>
              
              {/* Power Preview Metadata (Visible on Desktop) */}
              <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4 h-8">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-300">Views</span>
                  <span>1.2k</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-300">Leads</span>
                  <span>14</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

          <CardFooter className={`px-4 md:px-6 pb-4 md:pb-6 pt-0 flex justify-between items-center text-xs text-slate-400 ${isFeatured ? 'lg:px-0 lg:pb-0' : ''}`}>
          <div className="flex items-center gap-3">
            <span>Updated {new Date(property.updatedAt).toLocaleDateString()}</span>
            
            {isPublished ? (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors h-12 md:h-8 px-4 md:px-2"
                    title="Unpublish this listing"
                  >
                    <EyeOff className="h-5 w-5 md:h-3.5 md:w-3.5" />
                    <span className="md:inline">Unpublish</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">Confirm Unpublish</DialogTitle>
                    <DialogDescription className="text-slate-500">
                      This will take your listing down from the public URL. 
                      You can republish it at any time from the editor.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsOpen(false)}
                      disabled={isPending}
                      className="h-12 md:h-10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleUnpublish}
                      disabled={isPending}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Unpublishing...
                        </>
                      ) : (
                        'Yes, Unpublish'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              /* Soft Delete for Drafts */
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors h-12 md:h-8 px-4 md:px-2"
                    title="Delete this draft"
                    aria-label={`Delete draft: ${property.title || 'Untitled Property'}`}
                  >
                    <Trash2 className="h-5 w-5 md:h-3.5 md:w-3.5" />
                    <span className="md:inline">Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-display text-xl">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500">
                      This action is permanent and will remove the draft **"{property.title || 'Untitled Property'}"** from your dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      disabled={isPending}
                      className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        'Yes, Delete Draft'
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="link" className="p-0 h-auto text-slate-600 hover:text-primary font-semibold">
              <Link href={`/wizard?id=${property.id}&step=title`}>Edit</Link>
            </Button>
            {property.slug && (
              <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
                <Link href={`/property/${property.slug}`} target="_blank">View Live →</Link>
              </Button>
            )}
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleDuplicate}
              disabled={isPending}
              className="flex items-center gap-2 text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors h-12 md:h-8 px-4 md:px-2"
              title="Duplicate this listing"
              data-testid={`duplicate-listing-${property.id}`}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 md:h-3.5 md:w-3.5 animate-spin" />
              ) : (
                <Copy className="h-5 w-5 md:h-3.5 md:w-3.5" />
              )}
              <span className="md:inline">{isPending ? 'Duplicating...' : 'Duplicate'}</span>
            </Button>
          </div>
        </CardFooter>
        </div>
      </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
