import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { ArticleService } from './article.service';
import { PostArticle } from './dto';
import { Write } from './swagger';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @ApiOperation(Write.Operation)
    @ApiResponse(Write._200)
    @ApiResponse(Write._401)
    @Post('')
    async write(@CurrentUser() user: User, @Body() dto: PostArticle) {
        return await this.articleService.commit(user, dto);
    }
}
