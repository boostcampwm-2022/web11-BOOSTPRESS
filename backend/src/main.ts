import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app.module';
import { Env } from './types';

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
    const config = app.get(ConfigService<Env>);
    app.use(cookieParser());
    app.enableCors({
        origin: config.get('REDIRECT_URL'),
        credentials: true,
    });
    setSwaggerUp(app);
    await app.listen(8080);
}
bootstrap();
