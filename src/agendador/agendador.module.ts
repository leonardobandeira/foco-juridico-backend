import { Module } from '@nestjs/common';
import { AgendadorService } from './agendador.service';
import { AgendadorController } from './agendador.controller';
import { AnalistaService } from 'src/services/analista/analista.service';
import { IndicadoresService } from 'src/services/indicadores/indicadores.service';
import { EmailService } from 'src/services/email/email.service';

@Module({
  controllers: [AgendadorController],
  providers: [AgendadorService, AnalistaService, IndicadoresService, EmailService],
})
export class AgendadorModule {}
