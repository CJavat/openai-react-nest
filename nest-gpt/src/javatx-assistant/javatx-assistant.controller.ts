import { Body, Controller, Post } from '@nestjs/common';
import { JavatxAssistantService } from './javatx-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('javatx-assistant')
export class JavatxAssistantController {
  constructor(
    private readonly javatxAssistantService: JavatxAssistantService,
  ) {}

  @Post('create-thread')
  async createThread() {
    return this.javatxAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {
    return this.javatxAssistantService.userQuestion(questionDto);
  }
}
