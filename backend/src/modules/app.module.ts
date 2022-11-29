import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule,
        AuthModule,
        PrismaModule,
        ArticleModule,
        BlogModule,
        UserModule,
        TagModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
