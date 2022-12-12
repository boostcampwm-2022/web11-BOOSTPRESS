import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { DatabaseCommandService } from './db.command.service';
import { DatabaseQueryService } from './db.query.service';
import { FileService } from './file.service';
import { GithubService } from './github.service';

@Module({
    imports: [HttpModule],
    providers: [
        DatabaseCommandService,
        DatabaseQueryService,
        FileService,
        GithubService,
    ],
    controllers: [ArticleController],
})
export class ArticleModule {}
