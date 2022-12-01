import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { ArticleController } from './article.controller';
import { FileService } from './file.service';
import { GithubService } from './github.service';

@Module({
    imports: [HttpModule],
    providers: [DatabaseService, FileService, GithubService],
    controllers: [ArticleController],
})
export class ArticleModule {}
