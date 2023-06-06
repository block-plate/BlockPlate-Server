import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as expressBasicAuth from 'express-basic-auth';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import { HttpApiExceptionFilter } from './common/exception/http-api-exception.filter';
import { UnauthorizedExceptionFilter } from './common/exception/unauthorizedException.filter';
import { SuccessInterceptor } from './common/interceptor/success.interceptor';

export class Application {
  private logger = new Logger();
  private DEV_MODE: boolean;
  private PORT: string;
  private corsOriginList: string[];
  private ADMIN_USER: string;
  private ADMIN_PASSWORD: string;
  constructor(private server: NestExpressApplication) {
    this.server = server;
    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
    this.PORT = process.env.PORT || '5000';
    this.corsOriginList = process.env.CORS_ORIGIN_LIST
      ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
      : ['*'];
    this.ADMIN_USER = process.env.ADMIN_USER || 'admin';
    this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1234';
  }

  //doc 문서 접근

  private setUpBasicAuth() {
    this.server.use(
      ['/docs', '/docs-json'],
      expressBasicAuth({
        challenge: true,
        users: { [this.ADMIN_USER]: this.ADMIN_PASSWORD },
      }),
    );
  }

  // Swagger set

  private setUpOpenAPIMidleware() {
    SwaggerModule.setup(
      'docs/v1',
      this.server,
      SwaggerModule.createDocument(
        this.server,
        new DocumentBuilder()
          .setTitle('block-plate-API')
          .setDescription('blockplate')
          .setVersion('v1')
          .addBearerAuth()
          .build(),
        { extraModels: [] },
      ),
    );
  }

  private setAPIversioning() {
    this.server.enableVersioning({
      type: VersioningType.URI,
    });
  }

  // global middleware set

  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      //origin: this.corsOriginList,
      origin: 'http://localhost:8000',
      credentials: true,
    });
    this.server.use(
      expressSession({
        secret: 'SECRET',
        resave: true,
        saveUninitialized: true,
      }),
    );
    this.server.setGlobalPrefix('api');

    this.server.use(cookieParser());
    this.setUpBasicAuth();
    this.setUpOpenAPIMidleware();
    this.setAPIversioning();
    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    this.server.use(passport.initialize());
    this.server.use(passport.session());
    this.server.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.server.get(Reflector)),
      new SuccessInterceptor(),
    );

    this.server.useGlobalFilters(
      new HttpApiExceptionFilter(),
      new UnauthorizedExceptionFilter(),
    );
  }

  async boostrap() {
    await this.setUpGlobalMiddleware();

    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }
  errorLog(error: string) {
    this.logger.error(`🆘 Server error ${error}`);
  }
}
