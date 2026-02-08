/**
 * NextAuth.js API route handler
 * @fileoverview Exports GET and POST handlers for /api/auth/*
 * 
 * Fixed for Next.js 16: Route handlers with dynamic params now receive params as Promise
 */
import { handlers } from '@/auth';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  return handlers.GET(request);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  return handlers.POST(request);
}
