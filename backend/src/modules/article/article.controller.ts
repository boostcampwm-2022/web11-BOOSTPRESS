import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { ArticleService } from './article.service';
import { PostArticle } from './dto';
import { Write } from './swagger';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @ApiOperation(Write.Operation)
    @ApiResponse(Write._201)
    @ApiResponse(Write._401)
    @UseGuards(JwtGuard)
    @Post()
    async write(@CurrentUser() user: User, @Body() dto: PostArticle) {
        return await this.articleService.create(user, dto);
    }
}
