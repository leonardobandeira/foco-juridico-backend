import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DbModule } from './db/db.module';
import { PainelModule } from './painel/painel.module';
import { IndicadorModule } from './indicador/indicador.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [UsuarioModule, PainelModule, IndicadorModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    })
  }

}
