import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DbModule } from './db/db.module';
import { PainelModule } from './painel/painel.module';
import { IndicadorModule } from './indicador/indicador.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { AlertaModule } from './alerta/alerta.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AgendadorModule } from './agendador/agendador.module';
import { IndicadoresService } from './services/indicadores/indicadores.service';

@Module({
  imports: [AuthModule, UsuarioModule, PainelModule, IndicadorModule, AlertaModule, DbModule, ScheduleModule.forRoot(), AgendadorModule],
  controllers: [AppController],
  providers: [AppService, IndicadoresService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
