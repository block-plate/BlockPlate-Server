import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../user/provider/user.repository';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: {
          expiresIn: `${configService.get('ACCESS_TOKEN_EXPIRESIN')}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserRepository, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
