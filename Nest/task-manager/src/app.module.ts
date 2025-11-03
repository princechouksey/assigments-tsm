import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>({
        uri: configService.get<string>('DATABASE_URL'),
      })
    }),
    TasksModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
