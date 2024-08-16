import { Module } from '@nestjs/common';
import { AlertaController } from './alerta.controller';
import { DbModule } from 'src/db/db.module';
import { AlertaRepository } from './alerta.repository';

@Module({
  controllers: [AlertaController],
  imports: [DbModule],
  providers: [AlertaRepository]
})
export class AlertaModule {}
