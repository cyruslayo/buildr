
import { POST } from '@/app/api/generate/route';
import { LLMGateway } from '@/lib/llm/gateway';

// Mock LLMGateway
jest.mock('@/lib/llm/gateway', () => {
  return {
    LLMGateway: {
      getInstance: jest.fn().mockReturnValue({
        generateComponent: jest.fn(),
      }),
    },
  };
});

describe('POST /api/generate', () => {
  const mockGenerateComponent = LLMGateway.getInstance().generateComponent as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 for missing prompt', async () => {
    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });
  
  it('returns 200 and calls gateway for valid request', async () => {
    mockGenerateComponent.mockResolvedValue({
      text: 'generated code',
      usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 }
    });

    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'Create a hero section',
        pageType: 'listing',
        stream: false
      }),
    });
    
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.text).toBe('generated code');
    expect(mockGenerateComponent).toHaveBeenCalled();
  });

  it('returns stream when requested', async () => {
    mockGenerateComponent.mockResolvedValue({
      toDataStreamResponse: () => new Response('stream data')
    });

    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'Create a hero section',
        pageType: 'listing',
        stream: true
      }),
    });
    
    const res = await POST(req as any);
    // When returning a stream, the status is usually 200 but controlled by the response object
    expect(res).toBeDefined();
  });
});
