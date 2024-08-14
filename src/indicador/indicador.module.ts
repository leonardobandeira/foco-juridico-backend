import { Module } from '@nestjs/common';
import { IndicadorController } from './indicador.controller';
import { DbModule } from 'src/db/db.module';
import { IndicadorRepository } from './indicador.repository';

@Module({
  controllers: [IndicadorController],
  imports: [DbModule],
  providers: [IndicadorRepository]
})
export class IndicadorModule {}
