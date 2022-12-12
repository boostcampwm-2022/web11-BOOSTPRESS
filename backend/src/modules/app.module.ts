import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { BlogModule } from './blog/blog.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule,
        AuthModule,
        PrismaModule,
        ArticleModule,
        BlogModule,
        TagModule,
        CategoryModule,
        ImageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
