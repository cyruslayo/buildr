// __tests__/lib/prompts/prompt-builder.test.ts
import { buildConstrainedPrompt, type WizardData } from '@/lib/prompts/prompt-builder';

describe('buildConstrainedPrompt', () => {
  const mockWizardData: WizardData = {
    pageType: 'listing',
    content: {
      propertyType: 'detached_duplex',
      price: 85000000,
      beds: 4,
      baths: 3,
      sqm: 350,
      city: 'Lagos',
      area: 'Lekki Phase 1',
      features: ['Bore Hole', 'Generator House'],
    },
    style: { preset: 'modern' },
    whatsapp: {
      number: '08012345678',
      message: 'Interested in property',
      showFloating: true,
    },
  };
  
  it('returns system, user, and context', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.system).toBeDefined();
    expect(prompt.user).toBeDefined();
    expect(prompt.context).toBeDefined();
  });
  
  it('user prompt contains Naira price', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.user).toContain('₦');
    expect(prompt.user).toContain('85,000,000');
  });
  
  it('user prompt contains WhatsApp config', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.user).toContain('wa.me');
    expect(prompt.user).toContain('2348012345678');
  });

  it('user prompt contains property details', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.user).toContain('Lekki Phase 1');
    expect(prompt.user).toContain('4');
    expect(prompt.user).toContain('350');
    expect(prompt.user).toContain('sqm');
  });

  it('user prompt contains selected features', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.user).toContain('Bore Hole');
    expect(prompt.user).toContain('Generator House');
  });

  it('system prompt contains Nigerian rules', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.system).toContain('Nigerian');
    expect(prompt.system).toContain('Naira');
  });
});
