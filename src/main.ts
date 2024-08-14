import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para todas as origens
  app.enableCors({
    origin: '*', // Permite todas as origens
  });

  await app.listen(3000);
}
bootstrap();
