import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app.module';

function setSwaggerUp(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('BoostPress API Docs')
        .setDescription('BoostPress API description')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({ origin: 'http://localhost:3000', credentials: true });
    setSwaggerUp(app);
    await app.listen(8080);
}
bootstrap();
