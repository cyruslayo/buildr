'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LivePreviewFrameProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

/**
 * LivePreviewFrame
 * Wraps a React Component in a scalable "Phone Frame" for landing page showcases.
 * Disables pointer events to prevent scroll hijacking, but allows visual interaction.
 * 
 * "Alice in Wonderland" Effect: It's the real app, just smaller.
 */
export function LivePreviewFrame({ children, className, scale = 0.5 }: LivePreviewFrameProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl",
        "w-[375px] h-[812px] shrink-0", // iPhone X dimensions (simulated)
        className
      )}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-2xl z-50 pointer-events-none" />
      
      {/* Screen Content */}
      <div className="w-full h-full bg-white overflow-y-auto no-scrollbar pointer-events-none select-none relative z-10">
        {children}
      </div>

      {/* Hardware Bezel Effects */}
      {/* 1. Inner Metallic Rim */}
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-50 border-[2px] border-white/10 shadow-[inset_0_0_10px_2px_rgba(0,0,0,0.5)]" />
      
      {/* 2. Screen Gloss/Reflection */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-white/10 via-transparent to-transparent rounded-[2rem] opacity-50" />
    </div>
  );
}
