// __tests__/setup/dependencies.test.ts
describe('Core Dependencies', () => {
  it('should have required packages installed', () => {
    const pkg = require('../../package.json');
    expect(pkg.dependencies['@ai-sdk/google']).toBeDefined();
    expect(pkg.dependencies['zustand']).toBeDefined();
    expect(pkg.dependencies['zod']).toBeDefined();
    expect(pkg.dependencies['@prisma/client']).toBeDefined();
    expect(pkg.dependencies['ai']).toBeDefined();
  });
});
