import { Module } from '@nestjs/common';
import { AlertaController } from './alerta.controller';
import { DbModule } from 'src/db/db.module';
import { AlertaRepository } from './alerta.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { AgendadorService } from 'src/agendador/agendador.service';
import { AnalistaService } from 'src/analista/analista.service';

@Module({
  controllers: [AlertaController],
  imports: [DbModule, ScheduleModule.forRoot()],
  providers: [AlertaRepository, AgendadorService, AnalistaService]
})
export class AlertaModule {}
