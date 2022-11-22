import { Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post('')
    write(@CurrentUser() user: User) {
        return this.articleService.commit(user);
    }
}
