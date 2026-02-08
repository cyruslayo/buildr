// __tests__/lib/prompts/system-prompt.test.ts
import { NIGERIA_SYSTEM_PROMPT } from '@/lib/prompts/system-prompt';

describe('Nigerian System Prompt', () => {
  it('contains Nigerian identity', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('Nigerian');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('Naira');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('₦');
  });
  
  it('contains ALWAYS DO rules', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('square meters');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('WhatsApp');
  });
  
  it('contains NEVER DO rules', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('USD');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('sqft');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('HOA');
  });

  it('contains Nigerian property terminology', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('duplex');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('BQ');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('bore hole');
  });

  it('contains forbidden American terms list', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('MLS');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('escrow');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('realtor');
  });
});
