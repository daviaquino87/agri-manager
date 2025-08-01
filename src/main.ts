import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { EnvService } from '@/infra/env/env.service';

import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { NextFunction, Response } from 'express';

const packageJson = readFileSync('package.json', 'utf-8');
const { version, name, description } = JSON.parse(packageJson);

async function startServerHttp(app: NestExpressApplication) {
  await app.listen(process.env.PORT ?? 3000);
}

function enableDocs(app: NestExpressApplication) {
  Logger.log('Enable swagger');
  const formatName = name?.toUpperCase()?.replace('-', ' ');

  const config = new DocumentBuilder()
    .setTitle(formatName)
    .setDescription(description)
    .setVersion('')
    .addServer('/api/v1', 'API V1')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: `${formatName} ${version}`,
  };
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, customOptions);
}

function enableCors(app: NestExpressApplication) {
  app.enableCors();
}

export function secureApp(app: NestExpressApplication): void {
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Server', `${name}-server`);
    next();
  });

  app.set('trust proxy', 1);
}

async function bootstrap() {
  Logger.log(`Start api application: ${name}:${version}`);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const env = app.get(EnvService);

  const NODE_ENV = env.get('NODE_ENV');

  if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    enableDocs(app);
  }

  enableCors(app);
  secureApp(app);

  app.setGlobalPrefix('api/v1');

  await startServerHttp(app);
}

void bootstrap();
