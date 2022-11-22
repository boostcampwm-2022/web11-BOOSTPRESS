import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { ArticleService } from './article.service';
import { PostArticle } from './dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post('')
    async write(@CurrentUser() user: User, @Body() dto: PostArticle) {
        return await this.articleService.commit(user, dto);
    }
}
