/**
 * @fileoverview TDD tests for Project CRUD API
 * BLDR-2API-001: Create, Read, Update, Delete projects with user scoping
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';

// Mock auth to provide authenticated session
jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

// Mock Prisma client
jest.mock('@/lib/db', () => ({
  prisma: {
    project: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe('Project API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('POST /api/projects', () => {
    it('returns 401 when not authenticated', async () => {
      const { auth } = await import('@/lib/auth/auth');
      (auth as any).mockResolvedValue(null);

      const { POST } = await import('@/app/api/projects/route');
      const req = new NextRequest('http://localhost/api/projects', {
        method: 'POST',
        body: JSON.stringify({ name: 'My Property Page', pageType: 'listing' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(401);
    });

    it('creates project for authenticated user', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      (prisma.project.create as any).mockResolvedValue({
        id: 'proj_123',
        name: 'My Property Page',
        pageType: 'listing',
        code: '<html></html>',
        userId: 'user_123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { POST } = await import('@/app/api/projects/route');
      const req = new NextRequest('http://localhost/api/projects', {
        method: 'POST',
        body: JSON.stringify({
          name: 'My Property Page',
          pageType: 'listing',
          code: '<html></html>',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(201);

      const data = await res.json();
      expect(data.id).toBe('proj_123');
      expect(data.name).toBe('My Property Page');
    });

    it('returns 400 for missing required fields', async () => {
      const { auth } = await import('@/lib/auth/auth');
      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      const { POST } = await import('@/app/api/projects/route');
      const req = new NextRequest('http://localhost/api/projects', {
        method: 'POST',
        body: JSON.stringify({}), // Missing name and pageType
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/projects', () => {
    it('returns user projects with pagination', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      const mockProjects = [
        {
          id: 'proj_1',
          name: '4BR Duplex Lekki',
          pageType: 'listing',
          code: '<html></html>',
          userId: 'user_123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'proj_2',
          name: 'Land Sale VI',
          pageType: 'land',
          code: '<html></html>',
          userId: 'user_123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (prisma.project.findMany as any).mockResolvedValue(mockProjects);
      (prisma.project.count as any).mockResolvedValue(2);

      const { GET } = await import('@/app/api/projects/route');
      const req = new NextRequest('http://localhost/api/projects?page=1&limit=10');

      const res = await GET(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.projects).toHaveLength(2);
      expect(data.total).toBe(2);
      expect(data.page).toBe(1);
    });

    it('returns 401 when not authenticated', async () => {
      const { auth } = await import('@/lib/auth/auth');
      (auth as any).mockResolvedValue(null);

      const { GET } = await import('@/app/api/projects/route');
      const req = new NextRequest('http://localhost/api/projects');

      const res = await GET(req);
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/projects/[id]', () => {
    it('returns single project by ID', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      (prisma.project.findFirst as any).mockResolvedValue({
        id: 'proj_123',
        name: 'My Property Page',
        pageType: 'listing',
        code: '<html></html>',
        userId: 'user_123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { GET } = await import('@/app/api/projects/[id]/route');
      const req = new NextRequest('http://localhost/api/projects/proj_123');

      const res = await GET(req, { params: Promise.resolve({ id: 'proj_123' }) });
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.id).toBe('proj_123');
    });

    it('returns 404 for non-existent project', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      (prisma.project.findFirst as any).mockResolvedValue(null);

      const { GET } = await import('@/app/api/projects/[id]/route');
      const req = new NextRequest('http://localhost/api/projects/nonexistent');

      const res = await GET(req, { params: Promise.resolve({ id: 'nonexistent' }) });
      expect(res.status).toBe(404);
    });

    it('returns 403 for accessing other users project', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      // findFirst with userId filter returns null (user scoping)
      (prisma.project.findFirst as any).mockResolvedValue(null);

      const { GET } = await import('@/app/api/projects/[id]/route');
      const req = new NextRequest('http://localhost/api/projects/other_user_proj');

      const res = await GET(req, { params: Promise.resolve({ id: 'other_user_proj' }) });
      expect(res.status).toBe(404); // Returns 404 to hide existence
    });
  });

  describe('PUT /api/projects/[id]', () => {
    it('updates project for owner', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      (prisma.project.findFirst as any).mockResolvedValue({
        id: 'proj_123',
        name: 'Old Name',
        userId: 'user_123',
      });

      (prisma.project.update as any).mockResolvedValue({
        id: 'proj_123',
        name: 'Updated Name',
        pageType: 'listing',
        code: '<html>Updated</html>',
        userId: 'user_123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { PUT } = await import('@/app/api/projects/[id]/route');
      const req = new NextRequest('http://localhost/api/projects/proj_123', {
        method: 'PUT',
        body: JSON.stringify({ name: 'Updated Name', code: '<html>Updated</html>' }),
      });

      const res = await PUT(req, { params: Promise.resolve({ id: 'proj_123' }) });
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.name).toBe('Updated Name');
    });

    it('returns 404 when project not found or not owned', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      (prisma.project.findFirst as any).mockResolvedValue(null);

      const { PUT } = await import('@/app/api/projects/[id]/route');
      const req = new NextRequest('http://localhost/api/projects/nonexistent', {
        method: 'PUT',
        body: JSON.stringify({ name: 'Updated' }),
      });

      const res = await PUT(req, { params: Promise.resolve({ id: 'nonexistent' }) });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/projects/[id]', () => {
    it('deletes project for owner', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      (prisma.project.findFirst as any).mockResolvedValue({
        id: 'proj_123',
        userId: 'user_123',
      });

      (prisma.project.delete as any).mockResolvedValue({
        id: 'proj_123',
      });

      const { DELETE } = await import('@/app/api/projects/[id]/route');
      const req = new NextRequest('http://localhost/api/projects/proj_123', {
        method: 'DELETE',
      });

      const res = await DELETE(req, { params: Promise.resolve({ id: 'proj_123' }) });
      expect(res.status).toBe(204);
    });

    it('returns 404 when project not found or not owned', async () => {
      const { auth } = await import('@/lib/auth/auth');
      const { prisma } = await import('@/lib/db');

      (auth as any).mockResolvedValue({
        user: { id: 'user_123', email: 'test@example.com' },
      });

      (prisma.project.findFirst as any).mockResolvedValue(null);

      const { DELETE } = await import('@/app/api/projects/[id]/route');
      const req = new NextRequest('http://localhost/api/projects/nonexistent', {
        method: 'DELETE',
      });

      const res = await DELETE(req, { params: Promise.resolve({ id: 'nonexistent' }) });
      expect(res.status).toBe(404);
    });
  });
});
