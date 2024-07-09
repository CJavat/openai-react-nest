import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { JavatxAssistantModule } from './javatx-assistant/javatx-assistant.module';

@Module({
  imports: [GptModule, ConfigModule.forRoot(), JavatxAssistantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
