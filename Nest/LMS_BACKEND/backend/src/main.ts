import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allow requests from the frontend dev server (CORS)
  // in production you should lock this down to your frontend origin(s)
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
