/**
 * Template API Routes Tests
 * BLDR-3TPL-002: Create Template API Routes
 * 
 * Tests for GET /api/templates and GET /api/templates/[id] endpoints.
 */

import { GET } from '@/app/api/templates/route';
import { GET as GET_BY_ID } from '@/app/api/templates/[id]/route';
import { NextRequest } from 'next/server';

describe('GET /api/templates', () => {
  it('returns list of templates', async () => {
    const req = new NextRequest('http://localhost:3000/api/templates');
    const res = await GET(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.templates).toBeInstanceOf(Array);
    expect(data.templates.length).toBeGreaterThan(0);
  });
  
  it('filters by category', async () => {
    const req = new NextRequest('http://localhost:3000/api/templates?category=listing');
    const res = await GET(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    data.templates.forEach((t: { category: string }) => {
      expect(t.category).toBe('listing');
    });
  });
  
  it('returns empty array for unknown category', async () => {
    const req = new NextRequest('http://localhost:3000/api/templates?category=unknown');
    const res = await GET(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.templates).toEqual([]);
  });
  
  it('includes pagination metadata', async () => {
    const req = new NextRequest('http://localhost:3000/api/templates?page=1&limit=5');
    const res = await GET(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.page).toBeDefined();
    expect(data.limit).toBeDefined();
    expect(data.total).toBeDefined();
  });
});

describe('GET /api/templates/[id]', () => {
  it('returns template with code', async () => {
    const req = new NextRequest('http://localhost:3000/api/templates/tmpl_listing_standard_ng');
    const res = await GET_BY_ID(req, { params: Promise.resolve({ id: 'tmpl_listing_standard_ng' }) });
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.id).toBe('tmpl_listing_standard_ng');
    expect(data.code).toBeDefined();
    expect(data.nigeriaSpecific).toBe(true);
  });
  
  it('returns 404 for unknown template', async () => {
    const req = new NextRequest('http://localhost:3000/api/templates/unknown_template');
    const res = await GET_BY_ID(req, { params: Promise.resolve({ id: 'unknown_template' }) });
    
    expect(res.status).toBe(404);
  });
});
