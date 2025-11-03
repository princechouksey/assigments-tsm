import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService,JwtStrategy],
  imports:[
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })

  ],
  exports:[AuthService],

})
export class AuthModule {}
