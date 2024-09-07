import { Module } from '@nestjs/common';
import { AgendadorService } from './agendador.service';
import { AgendadorController } from './agendador.controller';
import { AnalistaService } from 'src/analista/analista.service';

@Module({
  controllers: [AgendadorController],
  providers: [AgendadorService, AnalistaService],
})
export class AgendadorModule {}
