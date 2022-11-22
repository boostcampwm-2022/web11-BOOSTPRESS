import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
    imports: [HttpModule],
    providers: [ArticleService],
    controllers: [ArticleController],
})
export class ArticleModule {}
