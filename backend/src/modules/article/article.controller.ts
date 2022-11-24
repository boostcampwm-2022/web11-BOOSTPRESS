import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { ArticleService } from './article.service';
import { PatchArticleDTO, PostArticleDTO } from './dto';
import { Create, Update } from './swagger';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @ApiOperation(Create.Operation)
    @ApiResponse(Create._201)
    @ApiResponse(Create._401)
    @UseGuards(JwtGuard)
    @Post()
    async create(@CurrentUser() user: User, @Body() dto: PostArticleDTO) {
        return await this.articleService.create(user, dto);
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return await this.articleService.readOne(id);
    }

    @ApiOperation(Update.Operation)
    @ApiResponse(Update._200)
    @ApiResponse(Update._401)
    @UseGuards(JwtGuard)
    @Patch()
    async update(@CurrentUser() user: User, @Body() dto: PatchArticleDTO) {
        return await this.articleService.update(user, dto);
    }
}
