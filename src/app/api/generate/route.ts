import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { LLMGateway } from '@/lib/llm/gateway';

const generateSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  pageType: z.string().optional(),
  stream: z.boolean().default(false),
});

export async function POST(req: NextRequest | Request) {
  try {
    const body = await req.json();
    const parseResult = generateSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { prompt, pageType = 'generic', stream } = parseResult.data;

    // TODO: Implement proper prompt engineering/builder here
    // For now we just pass specific context
    const systemPrompt = `You are an expert React developer specializing in Tailwind CSS. 
    You are building a ${pageType} section for a Nigerian Real Estate website.
    Use shadcn/ui components where possible.
    Ensure "Currency" is always Naira (₦) and measurements in sqm.`;

    const gateway = LLMGateway.getInstance();
    const result = await gateway.generateComponent(systemPrompt, prompt, {
      stream,
      temperature: 0.2 // Lower temp for code generation
    });

    if (stream && 'toDataStreamResponse' in result) {
      return (result as { toDataStreamResponse: () => Response }).toDataStreamResponse();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Generate API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
