import { Module } from '@nestjs/common';
import { AlertaController } from './alerta.controller';
import { DbModule } from 'src/db/db.module';
import { AlertaRepository } from './alerta.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { AgendadorService } from 'src/agendador/agendador.service';

@Module({
  controllers: [AlertaController],
  imports: [DbModule, ScheduleModule.forRoot()],
  providers: [AlertaRepository, AgendadorService]
})
export class AlertaModule {}
