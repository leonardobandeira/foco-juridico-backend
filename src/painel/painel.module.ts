import { Module } from '@nestjs/common';
import { PainelController } from './painel.controller';
import { DbModule } from 'src/db/db.module';
import { PainelRepository } from './painel.repository';

@Module({
  controllers: [PainelController],
  imports: [DbModule],
  providers: [PainelRepository]
})
export class PainelModule {}
