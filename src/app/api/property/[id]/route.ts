/**
 * Property API Route
 * @fileoverview Returns property data with agent verification status
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: { slug: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            kycStatus: true,
          },
        },
      },
    });

    if (!property || property.status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: property.id,
      title: property.title,
      agent: {
        id: property.user.id,
        name: property.user.name || 'Agent',
        kyc_status: property.user.kycStatus?.toLowerCase() || 'unverified',
      },
    });
  } catch (error) {
    console.error('Property API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}
