import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioRepository } from './usuario.repository';

@Module({
  controllers: [UsuarioController],
  imports: [DbModule],
  providers: [UsuarioRepository]
})
export class UsuarioModule {}
