import { Module } from '@nestjs/common';
import { JavatxAssistantService } from './javatx-assistant.service';
import { JavatxAssistantController } from './javatx-assistant.controller';

@Module({
  controllers: [JavatxAssistantController],
  providers: [JavatxAssistantService],
})
export class JavatxAssistantModule {}
