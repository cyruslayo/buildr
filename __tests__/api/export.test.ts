// __tests__/api/export.test.ts
import { POST } from '@/app/api/export/route';
import { NextRequest } from 'next/server';

describe('POST /api/export', () => {
  it('returns 400 for missing code', async () => {
    const req = new NextRequest('http://localhost/api/export', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('returns 400 for invalid format', async () => {
    const req = new NextRequest('http://localhost/api/export', {
      method: 'POST',
      body: JSON.stringify({
        code: '<div>Test</div>',
        format: 'invalid',
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns HTML file for generated code', async () => {
    const req = new NextRequest('http://localhost/api/export', {
      method: 'POST',
      body: JSON.stringify({
        code: '<div>Test Property in Lekki</div>',
        format: 'html',
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.downloadUrl).toBeDefined();
    expect(data.format).toBe('html');
  });
  
  it('returns ZIP for zip format', async () => {
    const req = new NextRequest('http://localhost/api/export', {
      method: 'POST',
      body: JSON.stringify({
        code: '<div>Test</div>',
        format: 'zip',
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.downloadUrl).toContain('.zip');
  });

  it('generates standalone HTML with Tailwind inlined', async () => {
    const req = new NextRequest('http://localhost/api/export', {
      method: 'POST',
      body: JSON.stringify({
        code: '<div class="bg-blue-500">Lekki Property</div>',
        format: 'html',
      }),
    });
    
    const res = await POST(req);
    const data = await res.json();
    
    // HTML should include Tailwind CDN for standalone rendering
    expect(data.html).toContain('tailwindcss');
    expect(data.html).toContain('<!DOCTYPE html>');
  });

  it('includes WhatsApp button in exports', async () => {
    const req = new NextRequest('http://localhost/api/export', {
      method: 'POST',
      body: JSON.stringify({
        code: '<div>Property Listing</div>',
        format: 'html',
        options: {
          whatsapp: {
            number: '2348012345678',
            message: 'Interested in this property',
          },
        },
      }),
    });
    
    const res = await POST(req);
    const data = await res.json();
    
    expect(data.html).toContain('wa.me');
    expect(data.html).toContain('2348012345678');
  });

  it('supports minify option', async () => {
    const req = new NextRequest('http://localhost/api/export', {
      method: 'POST',
      body: JSON.stringify({
        code: '<div>   Test   </div>',
        format: 'html',
        options: {
          minify: true,
        },
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.options?.minify).toBe(true);
  });
});
