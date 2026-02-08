'use client';

import React, { useState, useTransition } from 'react';
import { useWizardStore } from '@/features/wizard/store/wizard-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Copy, Share2, Loader2, MessageSquare } from 'lucide-react';
import { publishListing } from '@/features/wizard/actions/publish-listing';

export function PublishStep() {
  const { propertyData, propertyId, syncStatus, updatePropertyData } = useWizardStore();
  const [isPending, startTransition] = useTransition();
  const [copySuccess, setCopySuccess] = useState(false);

  const isPublished = propertyData.status === 'PUBLISHED';
  const isSyncing = syncStatus === 'syncing' || syncStatus === 'idle';
  const shareUrl = `agency.buildr.ng/${propertyData.slug}`;

  const handlePublish = () => {
    if (!propertyId) return;
    
    startTransition(async () => {
      // Note: teamId would come from session/context. Using placeholder for now (NFR-MultiTenancy)
      const result = await publishListing(propertyId, 'team_default');
      
      if (result.success && result.slug) {
        updatePropertyData({
          status: 'PUBLISHED',
          slug: result.slug,
        });
      } else {
        console.error('Publishing failed:', result.error);
      }
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareWhatsApp = () => {
    const message = `Check out this property: ${propertyData.title} at ${propertyData.location}. View details here: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isPublished) return <SuccessView slug={propertyData.slug} onCopy={copyToClipboard} onShare={shareWhatsApp} copySuccess={copySuccess} />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ready to go live?</h2>
        <p className="text-muted-foreground text-sm">Review your listing details one last time before publishing.</p>
      </div>

      <div className="grid gap-6">
        <SummaryCard data={propertyData} />

        {isSyncing && (
          <div className="space-y-3 animate-pulse">
            <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span>Syncing assets to Cloudinary...</span>
              <span>Processing</span>
            </div>
            <Progress value={90} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              Nigerians value high-quality visuals. We're optimizing your images for the Lagos market.
            </p>
          </div>
        )}

        <div className="pt-4">
          <Button 
            className="w-full py-7 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            disabled={isSyncing || isPending}
            onClick={handlePublish}
          >
            {isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publishing...</> : 'Publish Listing'}
          </Button>
          <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-[0.2em] font-medium opacity-70">
            Immediate broadcast to Lagos & Abuja markets.
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ data }: { data: any }) {
  const formatNaira = (amount?: number) => {
    if (amount === undefined) return '₦0';
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Card className="overflow-hidden border-primary/10 shadow-sm bg-slate-50/50">
      <CardHeader className="bg-primary/5 py-3 border-b border-primary/10">
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Listing Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 py-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Property Title</p>
            <p className="font-bold text-lg leading-tight">{data.title || 'Untitled Listing'}</p>
          </div>
          <Badge variant="secondary" className="bg-white border-primary/20 text-primary text-[10px] px-3 font-bold uppercase">{data.type || 'Property'}</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Asking Price</p>
            <p className="font-black text-xl text-primary">{formatNaira(data.price)}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Location</p>
            <p className="font-bold text-sm">{data.location || 'Lagos, Nigeria'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SuccessView({ slug, onCopy, onShare, copySuccess }: any) {
  return (
    <div className="space-y-8 animate-in zoom-in-95 fade-in duration-500 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-5 bg-green-500/10 rounded-full text-green-600 shadow-inner">
          <CheckCircle2 className="w-14 h-14" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-none">Published!</h2>
          <p className="text-muted-foreground text-sm font-medium">Your property is now live and ready to sell.</p>
        </div>
      </div>

      <Card className="max-w-md mx-auto overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/5">
        <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
          <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Property Link</CardTitle>
        </CardHeader>
        <CardContent className="py-8 bg-white">
          <code className="text-xs font-mono break-all p-4 bg-slate-50 border border-slate-200 rounded-lg block text-slate-600 shadow-inner">
            agency.buildr.ng/{slug}
          </code>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 pb-8 pt-0 px-8">
          <Button variant="outline" onClick={onCopy} className="w-full h-12 font-bold relative overflow-hidden group border-2">
            <Copy className="mr-2 h-4 w-4" />
            {copySuccess ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button onClick={onShare} className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white font-black shadow-lg shadow-green-500/10">
            <Share2 className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
