import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { env } from '@/config/env';

export interface GenerateOptions {
  stream?: boolean;
  model?: string;
  temperature?: number;
  maxRetries?: number;
}

export interface GenerateResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Type for streaming result - using ReturnType to infer from streamText
type StreamResult = ReturnType<typeof streamText>;

export class LLMGateway {
  private static instance: LLMGateway;
  private readonly defaultModel = 'gemini-1.5-pro-latest';

  private constructor() {
    // Initialization code if needed
  }

  public static getInstance(): LLMGateway {
    if (!LLMGateway.instance) {
      LLMGateway.instance = new LLMGateway();
    }
    return LLMGateway.instance;
  }

  public async generateComponent(
    systemPrompt: string,
    userPrompt: string,
    options: GenerateOptions = {}
  ): Promise<GenerateResponse | StreamResult> {
    const { maxRetries = 3, ...restOptions } = options;
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const modelName = restOptions.model || this.defaultModel;
        const model = google(modelName);

        const payload = {
          model,
          system: systemPrompt,
          prompt: userPrompt,
          temperature: restOptions.temperature ?? 0.7,
        };

        if (restOptions.stream) {
          return streamText(payload);
        } else {
          const result = await generateText(payload);
          // Map AI SDK usage to our interface (inputTokens/outputTokens -> promptTokens/completionTokens)
          const usage = result.usage ? {
            promptTokens: result.usage.inputTokens ?? 0,
            completionTokens: result.usage.outputTokens ?? 0,
            totalTokens: (result.usage.inputTokens ?? 0) + (result.usage.outputTokens ?? 0),
          } : undefined;
          return {
            text: result.text,
            usage,
          };
        }
      } catch (error) {
        console.warn(`LLM Gateway attempt ${attempt + 1} failed:`, error);
        lastError = error;
        // Simple exponential backoff
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    }

    console.error('LLM Gateway Error after retries:', lastError);
    throw new Error('LLM Gateway Error: ' + (lastError instanceof Error ? lastError.message : String(lastError)));
  }
}
