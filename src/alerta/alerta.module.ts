import { Module } from '@nestjs/common';
import { AlertaController } from './alerta.controller';
import { DbModule } from 'src/db/db.module';
import { AlertaRepository } from './alerta.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { AgendadorService } from 'src/agendador/agendador.service';
import { AnalistaService } from 'src/services/analista/analista.service';
import { IndicadoresService } from 'src/services/indicadores/indicadores.service';

@Module({
  controllers: [AlertaController],
  imports: [DbModule, ScheduleModule.forRoot()],
  providers: [AlertaRepository, AgendadorService, AnalistaService, IndicadoresService]
})
export class AlertaModule {}
