import { describe, it, expect, beforeAll } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Story 6.4: Stack Stability Verification Tests
 * 
 * These tests ensure the project remains on stable library versions
 * as defined in AR6 (Architecture Decision: Downgrade to Stable).
 */

describe('Stack Stability Verification', () => {
  let packageJson: Record<string, unknown>;
  let pnpmLock: string;

  beforeAll(() => {
    const packagePath = path.resolve(__dirname, '../../package.json');
    const content = fs.readFileSync(packagePath, 'utf-8');
    packageJson = JSON.parse(content);

    const lockPath = path.resolve(__dirname, '../../pnpm-lock.yaml');
    pnpmLock = fs.readFileSync(lockPath, 'utf-8');
  });

  const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const getImporterResolvedVersion = (pkgName: string): string => {
    const escaped = escapeRegExp(pkgName);
    const re = new RegExp(
      `\\n\\s{6}${escaped}:\\n\\s{8}specifier:[^\\n]*\\n\\s{8}version:\\s*([^\\n]+)`,
      'm'
    );
    const match = pnpmLock.match(re);
    if (!match?.[1]) {
      throw new Error(`Unable to find resolved version for ${pkgName} in pnpm-lock.yaml`);
    }

    return match[1].trim().split('(')[0];
  };

  describe('Core Dependencies (AR6 Compliance)', () => {
    it('should use Next.js 15.x stable (not 16.x canary)', () => {
      const dependencies = packageJson.dependencies as Record<string, string>;
      const nextVersion = dependencies['next'];
      
      expect(nextVersion).toBeDefined();
      expect(nextVersion).toMatch(/^\^?15\./);
      expect(nextVersion).not.toMatch(/16\./);
      expect(nextVersion).not.toMatch(/canary/i);
    });

    it('should use React 18.x stable (not 19.x RC)', () => {
      const dependencies = packageJson.dependencies as Record<string, string>;
      const reactVersion = dependencies['react'];
      
      expect(reactVersion).toBeDefined();
      expect(reactVersion).toMatch(/^\^?18\./);
      expect(reactVersion).not.toMatch(/19\./);
      expect(reactVersion).not.toMatch(/rc/i);
    });

    it('should use React DOM 18.x stable', () => {
      const dependencies = packageJson.dependencies as Record<string, string>;
      const reactDomVersion = dependencies['react-dom'];
      
      expect(reactDomVersion).toBeDefined();
      expect(reactDomVersion).toMatch(/^\^?18\./);
    });

    it('should use Tailwind CSS 3.4.x stable (not v4 alpha)', () => {
      const dependencies = packageJson.dependencies as Record<string, string>;
      const devDependencies = packageJson.devDependencies as Record<string, string>;
      const tailwindVersion = dependencies['tailwindcss'] ?? devDependencies['tailwindcss'];
      
      expect(tailwindVersion).toBeDefined();
      // Match ^3.4.x or 3.4.x patterns
      expect(tailwindVersion).toMatch(/^\^?3\.4\.\d+/);
      expect(tailwindVersion).not.toMatch(/^4\./);
      expect(tailwindVersion).not.toMatch(/alpha/i);
    });
  });

  describe('DevDependencies Alignment', () => {
    it('should use @next/bundle-analyzer matching Next.js major version', () => {
      const devDependencies = packageJson.devDependencies as Record<string, string>;
      const analyzerVersion = devDependencies['@next/bundle-analyzer'];
      
      expect(analyzerVersion).toBeDefined();
      expect(analyzerVersion).toMatch(/^\^?15\./);
      expect(analyzerVersion).not.toMatch(/16\./);
    });

    it('should use @next/eslint-plugin-next matching Next.js major version', () => {
      const devDependencies = packageJson.devDependencies as Record<string, string>;
      const eslintPluginVersion = devDependencies['@next/eslint-plugin-next'];
      
      expect(eslintPluginVersion).toBeDefined();
      expect(eslintPluginVersion).toMatch(/^\^?15\./);
      expect(eslintPluginVersion).not.toMatch(/16\./);
    });

    it('should use eslint-config-next matching Next.js major version', () => {
      const devDependencies = packageJson.devDependencies as Record<string, string>;
      const eslintConfigVersion = devDependencies['eslint-config-next'];
      
      expect(eslintConfigVersion).toBeDefined();
      expect(eslintConfigVersion).toMatch(/^\^?15\./);
    });
  });

  describe('Resolved Versions (pnpm-lock.yaml)', () => {
    it('should resolve Next.js 15.x stable', () => {
      const resolvedNext = getImporterResolvedVersion('next');
      expect(resolvedNext).toMatch(/^15\./);
      expect(resolvedNext).not.toMatch(/^16\./);
      expect(resolvedNext).not.toMatch(/canary/i);
    });

    it('should resolve React 18.x stable', () => {
      const resolvedReact = getImporterResolvedVersion('react');
      expect(resolvedReact).toMatch(/^18\./);
      expect(resolvedReact).not.toMatch(/^19\./);
      expect(resolvedReact).not.toMatch(/rc/i);
    });

    it('should resolve Tailwind CSS 3.4.x stable', () => {
      const resolvedTailwind = getImporterResolvedVersion('tailwindcss');
      expect(resolvedTailwind).toMatch(/^3\.4\./);
      expect(resolvedTailwind).not.toMatch(/^4\./);
      expect(resolvedTailwind).not.toMatch(/alpha/i);
    });
  });
});
