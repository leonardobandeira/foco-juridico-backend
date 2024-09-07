import { Module } from '@nestjs/common';
import { AnalistaService } from './analista.service';
import { AnalistaController } from './analista.controller';

@Module({
  controllers: [AnalistaController],
  providers: [AnalistaService],
})
export class AnalistaModule {}
