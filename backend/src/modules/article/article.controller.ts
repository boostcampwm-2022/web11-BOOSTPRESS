import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { DatabaseService } from './db.service';
import {
    UpsertDTO,
    FilterDTO,
    ArticleBriefResponseDTO,
    ArticleDetailedResponseDTO,
    ArticleListResponseDTO,
} from './dto';
import { FileService } from './file.service';
import { GithubService } from './github.service';
import { Create, ReadMany, ReadOne, Remove, Update } from './swagger';

@ApiTags('article')
@Controller('article')
export class ArticleController {
    constructor(
        private readonly db: DatabaseService,
        private readonly file: FileService,
        private readonly github: GithubService,
    ) {}

    @ApiOperation(Create.Operation)
    @ApiResponse(Create._201)
    @ApiResponse(Create._401)
    @UseGuards(JwtGuard)
    @Post()
    async create(
        @CurrentUser() user: User,
        @Body() dto: UpsertDTO,
    ): Promise<ArticleBriefResponseDTO> {
        const article = await this.db.create(user, dto);

        await Promise.all([
            this.file.write(article, dto.content),
            this.github.push(article, dto.content, user),
        ]);

        return ArticleBriefResponseDTO.fromArticle(article);
    }

    @ApiOperation(ReadOne.Operation)
    @ApiResponse(ReadOne._200)
    @Get(':id')
    async readOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArticleDetailedResponseDTO> {
        const article = await this.db.readOne(id);

        let content: string = '';

        try {
            content = await this.file.read(article.id);
        } catch {
            content = await this.github.pull(article.author, article.id);
            await this.file.write(article, content);
        }

        return ArticleDetailedResponseDTO.fromArticle(article, content);
    }

    @ApiOperation(ReadMany.Operation)
    @ApiResponse(ReadMany._200)
    @Get()
    async readMany(
        @Query(
            new ValidationPipe({
                transform: true,
                transformOptions: { enableImplicitConversion: true },
                forbidNonWhitelisted: true,
            }),
        )
        query: FilterDTO,
    ): Promise<ArticleListResponseDTO> {
        const { articles, totalPages } = await this.db.readMany(query);
        return {
            articles: articles.map(ArticleBriefResponseDTO.fromArticle),
            totalPages,
        };
    }

    @ApiOperation(Update.Operation)
    @ApiResponse(Update._200)
    @ApiResponse(Update._401)
    @UseGuards(JwtGuard)
    @Patch(':id')
    async update(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpsertDTO,
    ): Promise<ArticleBriefResponseDTO> {
        const article = await this.db.update(user, dto, id);

        await Promise.all([
            this.file.write(article, dto.content),
            this.github.push(article, dto.content, user),
        ]);

        return ArticleBriefResponseDTO.fromArticle(article);
    }

    @ApiOperation(Remove.Operation)
    @ApiResponse(Remove._200)
    @ApiResponse(Remove._401)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArticleBriefResponseDTO> {
        const article = await this.db.delete(user, id);
        return ArticleBriefResponseDTO.fromArticle(article);
    }
}
