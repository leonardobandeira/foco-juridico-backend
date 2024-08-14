import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DbModule } from './db/db.module';
import { PainelModule } from './painel/painel.module';
import { IndicadorModule } from './indicador/indicador.module';

@Module({
  imports: [UsuarioModule, PainelModule, IndicadorModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
