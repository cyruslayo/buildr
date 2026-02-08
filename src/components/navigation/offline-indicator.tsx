'use client';

/**
 * [use client] Justification:
 * This component relies on browser window events (online/offline) and Framer Motion 
 * for client-side animations of the network state indicator.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-4 flex items-center gap-4 text-white">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <WifiOff className="h-6 w-6 text-amber-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Offline Mode</h4>
              <p className="text-xs text-slate-400">You are currently working offline. Changes will sync when you're back.</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
