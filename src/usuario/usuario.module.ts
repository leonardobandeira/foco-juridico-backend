import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioReposiroty } from './usuario.reposiroty';

@Module({
  controllers: [UsuarioController],
  imports: [DbModule],
  providers: [UsuarioReposiroty]
})
export class UsuarioModule {}
