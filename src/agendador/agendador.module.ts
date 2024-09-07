import { Module } from '@nestjs/common';
import { AgendadorService } from './agendador.service';
import { AgendadorController } from './agendador.controller';

@Module({
  controllers: [AgendadorController],
  providers: [AgendadorService],
})
export class AgendadorModule {}
