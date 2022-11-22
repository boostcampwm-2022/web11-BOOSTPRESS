import { NestFactory } from '@nestjs/core';

import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    await app.listen(8080);

}
bootstrap();
