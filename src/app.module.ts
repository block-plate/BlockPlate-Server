import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOption } from './common/options/config.option';

import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(configOption), UserModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
