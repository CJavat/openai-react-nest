import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessageListUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class JavatxAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { question, threadId } = questionDto;

    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    const run = await createRunUseCase(this.openai, { threadId });

    const messages = await getMessageListUseCase(this.openai, { threadId });

    return messages;
  }
}