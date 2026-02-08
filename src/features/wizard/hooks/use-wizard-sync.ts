'use client';

import { useEffect, useRef } from 'react';
import { useWizardStore } from '../store/wizard-store';
import { updatePropertyDraft } from '../actions/update-property-draft';

/**
 * Hook to automatically synchronize wizard state to the server in the background.
 * Optimized for Nigerian 3G networks with debouncing and offline recovery.
 */
export function useWizardSync() {
  const { 
    propertyData, 
    propertyId, 
    syncStatus,
    lastSyncedAt,
    setPropertyId, 
    setSyncStatus, 
    setLastSyncedAt 
  } = useWizardStore();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  const sync = async () => {
    if (Object.keys(propertyData).length === 0) return;

    setSyncStatus('syncing');

    const result = await updatePropertyDraft({
      propertyId,
      propertyData,
      lastModified: lastSyncedAt || new Date(0).toISOString(),
    });

    if (result.success && result.propertyId) {
      setPropertyId(result.propertyId);
      setLastSyncedAt(result.updatedAt || new Date().toISOString());
      setSyncStatus('synced');
    } else if (result.error === 'CONFLICT') {
      // Server is newer! Update last synced to server's time to resolve conflict
      console.warn('Sync conflict: Server is newer. Reconciling...');
      setLastSyncedAt(result.serverData?.updatedAt || null);
      setSyncStatus('synced'); // Mark as synced since we're now aligned with server
    } else {
      console.error('Sync failed:', result.error);
      setSyncStatus('error');
    }
  };

  // Debounced Sync on Data Change
  useEffect(() => {
    // Skip initial mount to prevent immediate sync if data is loaded from storage
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      sync();
    }, 500); 

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [propertyData]); // Only depends on data changes

  // Offline-to-Online Recovery
  useEffect(() => {
    const handleOnline = () => {
      if (useWizardStore.getState().syncStatus === 'error') {
        sync();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []); // Static listener, uses state getter for fresh status

  return { syncStatus };
}
