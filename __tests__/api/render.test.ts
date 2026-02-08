// __tests__/api/render.test.ts
import { POST } from '@/app/api/render/route';
import { NextRequest } from 'next/server';

describe('POST /api/render', () => {
  it('returns 400 for missing templateId', async () => {
    const req = new NextRequest('http://localhost/api/render', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    
    const data = await res.json();
    expect(data.error).toBeDefined();
  });
  
  it('returns 404 for unknown template', async () => {
    const req = new NextRequest('http://localhost/api/render', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'unknown_template',
        data: {},
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(404);
  });

  it('returns rendered template for valid request', async () => {
    const req = new NextRequest('http://localhost/api/render', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'tmpl_listing_luxury_ng',
        data: {
          price: 85000000,
          beds: 4,
          baths: 4,
          sqm: 350,
          location: 'Lekki Phase 1, Lagos',
        },
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.previewUrl).toBeDefined();
    expect(data.templateId).toBe('tmpl_listing_luxury_ng');
  });

  it('formats Naira currency correctly in response', async () => {
    const req = new NextRequest('http://localhost/api/render', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'tmpl_listing_luxury_ng',
        data: {
          price: 85000000,
          beds: 4,
          baths: 4,
          sqm: 350,
          location: 'Lekki Phase 1, Lagos',
        },
      }),
    });
    
    const res = await POST(req);
    const data = await res.json();
    
    // Formatted price should be in Naira
    expect(data.formattedData.price).toContain('₦');
    expect(data.formattedData.price).toBe('₦85,000,000');
  });

  it('formats sqm correctly in response', async () => {
    const req = new NextRequest('http://localhost/api/render', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'tmpl_listing_luxury_ng',
        data: {
          price: 50000000,
          beds: 3,
          baths: 3,
          sqm: 250,
          location: 'Victoria Island, Lagos',
        },
      }),
    });
    
    const res = await POST(req);
    const data = await res.json();
    
    expect(data.formattedData.sqm).toBe('250 sqm');
  });
});
