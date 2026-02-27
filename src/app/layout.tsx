import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { OfflineIndicator } from '@/components/navigation/offline-indicator';
import { TooltipProvider } from '@/components/ui/tooltip';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'], // Art-Directed Variable Axes
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Buildr - Nigerian Real Estate Landing Page Builder',
  description: 'Template-based landing page builder for Nigerian real estate professionals',
  manifest: '/manifest.json',
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <TooltipProvider>
          <OfflineIndicator />
          {children}
          <Analytics />
        </TooltipProvider>
      </body>
    </html>
  );
}
