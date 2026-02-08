// __tests__/lib/llm/gateway.test.ts
import { LLMGateway } from '@/lib/llm/gateway';
import { generateText, streamText } from 'ai';

// Mock the AI SDK
jest.mock('ai', () => ({
  generateText: jest.fn(),
  streamText: jest.fn(),
}));

jest.mock('@ai-sdk/google', () => ({
  google: jest.fn(() => 'mock-google-model'),
}));

describe('LLM Gateway', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const gateway = LLMGateway.getInstance();
  
  it('should be singleton', () => {
    const instance2 = LLMGateway.getInstance();
    expect(gateway).toBe(instance2);
  });
  
  it('should generate component code', async () => {
    (generateText as jest.Mock).mockResolvedValue({
      text: 'export function Test() { return <button>Test</button> }',
      usage: {
        totalTokens: 50
      }
    });

    const result = await gateway.generateComponent(
      'You are a React component generator',
      'Create a simple button component'
    );
    
    expect(result.text).toContain('export');
    expect(result.text).toContain('function');
    expect(result.usage).toBeDefined();
    expect(generateText).toHaveBeenCalledWith(expect.objectContaining({
      model: 'mock-google-model',
      system: 'You are a React component generator',
      prompt: 'Create a simple button component',
    }));
  });
  
  it('should handle streaming', async () => {
    (streamText as jest.Mock).mockReturnValue({
      toDataStreamResponse: jest.fn(),
    });

    const stream = await gateway.generateComponent(
      'system prompt',
      'user prompt',
      { stream: true }
    );
    
    expect((stream as any).toDataStreamResponse).toBeDefined();
    expect(streamText).toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    (generateText as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(gateway.generateComponent('sys', 'user', { maxRetries: 0 }))
      .rejects.toThrow('LLM Gateway Error');
  });
});
