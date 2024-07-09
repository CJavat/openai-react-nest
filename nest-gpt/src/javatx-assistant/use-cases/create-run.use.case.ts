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

  //? Nueva forma de revisar el id
  if (run.status === 'completed') {
    //TODO: Si no funciona ir al penúltimo capitulo de ésta sección y agregar el checkStatusUseCase();
    return run;
  } else if (run.status === 'failed') {
    throw new InternalServerErrorException('Run Failed');
  }
};
