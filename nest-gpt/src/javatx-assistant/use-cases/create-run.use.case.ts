import { InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_msyjUSeCvy9ALSEEBE0xVc50' } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    // instructions: //? OJO! Sobre escribe el asistente.
    assistant_id: assistantId,
  });

  return run;
};
